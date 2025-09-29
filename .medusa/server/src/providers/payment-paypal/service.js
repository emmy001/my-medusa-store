"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {
//   Client,
//   LogLevel,
//   Environment,
//   CheckoutPaymentIntent,
//   PaymentsController,
//   OrdersController,
//   Order as PaypalOrder,
//   OrderStatus as PaypalOrderStatus,
//   PatchOp,
// } from "@paypal/paypal-server-sdk";
// import {
//   AuthorizePaymentInput,
//   AuthorizePaymentOutput,
//   GetPaymentStatusInput,
//   GetPaymentStatusOutput,
//   CapturePaymentInput,
//   CapturePaymentOutput,
//   InitiatePaymentInput,
//   InitiatePaymentOutput,
//   DeletePaymentInput,
//   DeletePaymentOutput,
//   RefundPaymentOutput,
//   RefundPaymentInput,
//   RetrievePaymentInput,
//   RetrievePaymentOutput,
//   BigNumberRawValue,
//   UpdatePaymentInput,
//   UpdatePaymentOutput,
//   ProviderWebhookPayload,
//   WebhookActionResult,
//   CancelPaymentInput,
//   CancelPaymentOutput,
// } from "@medusajs/framework/types";
// import { BigNumber } from "bignumber.js";
//
// import {
//   AbstractPaymentProvider,
//   isDefined,
//   MedusaError,
//   Module,
//   PaymentActions,
//   PaymentSessionStatus,
// } from "@medusajs/framework/utils";
// import { initiatePaymentData, PayPalOptions, VerifyWebhookSignature } from "./types";
// import { Logger } from "@medusajs/medusa";
// import { getPurchaseUnits } from "./utils";
//
// type InjectedDependencies = {
//   logger: Logger;
// };
//
// class PaypalProviderService extends AbstractPaymentProvider<PayPalOptions> {
//   protected paypal_api_: string;
//   protected logger_: Logger;
//   protected readonly options_: PayPalOptions;
//   protected client_: Client;
//   protected container_: Record<string, unknown>;
//   protected isIntentCaptured: boolean;
//
//   static identifier = "paypal";
//
//   static validateOptions(options: PayPalOptions): void {
//     if (!isDefined(options.clientId)) {
//       throw new Error("Required option `clientId` is missing in PayPal plugin");
//     }
//     if (!isDefined(options.clientSecret)) {
//       throw new Error(
//         "Required option `clientSecret` is missing in PayPal plugin"
//       );
//     }
//     if (!isDefined(options.intent)) {
//       throw new Error("Required option `intent` is missing in PayPal plugin");
//     }
//     if (!isDefined(options.sandbox)) {
//       throw new Error("Required option `sandbox` is missing in PayPal plugin");
//     }
//     if (!isDefined(options.webhookId)) {
//       throw new Error(
//         "Required option `webhookId` is missing in PayPal plugin"
//       );
//     }
//   }
//
//   public constructor(container: InjectedDependencies, options: PayPalOptions) {
//     // @ts-ignore
//     super(...arguments);
//
//     this.container_ = container;
//     this.options_ = options;
//     this.logger_ = this.container_.logger as Logger;
//
//     this.isIntentCaptured = this.options_.intent === "CAPTURE";
//     this.paypal_api_ = this.options_.sandbox
//       ? "https://api-m.sandbox.paypal.com"
//       : "https://api-m.paypal.com";
//
//     this.client_ = new Client({
//       clientCredentialsAuthCredentials: {
//         oAuthClientId: this.options_.clientId,
//         oAuthClientSecret: this.options_.clientSecret,
//       },
//       timeout: this.options_.timeout || 0,
//       environment: this.options_.sandbox
//         ? Environment.Sandbox
//         : Environment.Production,
//       logging: {
//         logLevel: this.options_.sandbox ? LogLevel.Debug : LogLevel.Warn,
//         logRequest: {
//           logBody: true,
//         },
//         logResponse: {
//           logHeaders: true,
//         },
//       },
//     });
//   }
//
//   async authorizePayment(
//     input: AuthorizePaymentInput
//   ): Promise<AuthorizePaymentOutput> {
//     try {
//       const statusData = await this.getPaymentStatus(input);
//
//       return statusData;
//     } catch (error) {
//       throw new MedusaError(
//         MedusaError.Types.UNEXPECTED_STATE,
//         `Authorize payment failed: ${error.message}`
//       );
//     }
//   }
//
//   async cancelPayment(paymentData: CancelPaymentInput): Promise<CancelPaymentOutput> {
//
//     const paypalOrder = paymentData.data!.paypalOrder as PaypalOrder;
//     if (paypalOrder.purchaseUnits?.length &&
//       paypalOrder.purchaseUnits[0].payments
//     ) {
//       const isAlreadyCanceled = paypalOrder.status === PaypalOrderStatus.Voided;
//       const isCanceledAndFullyRefund = paypalOrder.status === PaypalOrderStatus.Completed && !!paypalOrder.purchaseUnits[0].invoiceId;
//       if (isAlreadyCanceled || isCanceledAndFullyRefund) {
//         return await this.retrievePayment(paymentData)
//       }
//       const paymentsController = new PaymentsController(this.client_);
//       try {
//         const isAlreadyCaptured = paypalOrder.purchaseUnits.some((pu => pu.payments?.captures?.length));
//         if (isAlreadyCaptured) {
//           const payments = paypalOrder.purchaseUnits[0].payments;
//           const capturesId = payments.captures![0].id;
//           await paymentsController.refundCapturedPayment({
//             captureId: capturesId as string,
//           })
//         } else {
//           const id = paypalOrder.purchaseUnits[0].payments!.authorizations![0].id as string;
//           await paymentsController.voidPayment({
//             authorizationId: id
//           })
//         }
//         return await this.retrievePayment(paymentData)
//       } catch (error) {
//         throw new Error("An error occurred in cancelPayment")
//       }
//     }
//     throw new Error("An error occurred in cancelPayment")
//   }
//
//   async getPaymentStatus(
//     paymentData: GetPaymentStatusInput
//   ): Promise<GetPaymentStatusOutput> {
//     const retrievedPayment = await this.retrievePayment(paymentData);
//     const paypalOrder = retrievedPayment.data as PaypalOrder;
//
//     switch (paypalOrder.status as string) {
//       case PaypalOrderStatus.Created:
//         return {
//           status: PaymentSessionStatus.PENDING,
//           data: retrievedPayment.data,
//         };
//       // case PaypalOrderStatus.Saved:
//       // case PaypalOrderStatus.Approved:
//       case PaypalOrderStatus.PayerActionRequired:
//         return {
//           status: PaymentSessionStatus.REQUIRES_MORE,
//           data: retrievedPayment.data,
//         };
//       case PaypalOrderStatus.Voided:
//         return {
//           status: PaymentSessionStatus.CANCELED,
//           data: retrievedPayment.data,
//         };
//       case "authorized":
//         return {
//           status: PaymentSessionStatus.AUTHORIZED,
//           data: retrievedPayment.data,
//         };
//       case PaypalOrderStatus.Completed:
//         return {
//           status: PaymentSessionStatus.CAPTURED,
//           data: retrievedPayment.data,
//         };
//       default:
//         return {
//           status: PaymentSessionStatus.PENDING,
//           data: retrievedPayment.data,
//         };
//     }
//   }
//
//   async capturePayment(paymentData: any): Promise<CapturePaymentOutput> {
//     const paypalOrder = paymentData.data as PaypalOrder;
//
//     if (
//       paypalOrder.purchaseUnits?.length &&
//       paypalOrder.purchaseUnits[0].payments
//     ) {
//       const paymentsController = new PaymentsController(this.client_);
//       // Intent Captured
//       if (
//         this.isIntentCaptured &&
//         paypalOrder.purchaseUnits[0].payments.captures?.length
//       ) {
//         const id = paypalOrder.purchaseUnits[0].payments!.captures[0]
//           .id as string;
//         try {
//           await paymentsController.getCapturedPayment({
//             captureId: id,
//           });
//           return await this.retrievePayment(paymentData);
//         } catch (error) {
//           this.logger_.error(error);
//           throw new Error("An error occurred in capturePayment");
//         }
//       } else if (
//         paypalOrder.purchaseUnits[0].payments!.authorizations?.length
//       ) {
//         const id = paypalOrder.purchaseUnits[0].payments!.authorizations[0]
//           .id as string;
//         try {
//           await paymentsController.captureAuthorizedPayment({
//             authorizationId: id,
//           });
//           return await this.retrievePayment(paymentData);
//         } catch (error) {
//           this.logger_.error(error);
//           throw new Error("An error occurred in capturePayment");
//         }
//       } else {
//         throw new Error("An error occurred in capturePayment");
//       }
//     }
//     throw new MedusaError(
//       MedusaError.Types.UNEXPECTED_STATE,
//       `An error occurred in capturePayment`
//     );
//   }
//
//   async initiatePayment({
//     context,
//     data,
//     amount,
//     currency_code,
//   }: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
//     const ordersController = new OrdersController(this.client_);
//
//     data ? data.amount = amount : data = { amount, currency_code }
//     data ? data.currency_code = currency_code : data = { amount, currency_code }
//     try {
//       const purchaseUnits = getPurchaseUnits(data as any);
//
//       const { result } = await ordersController.createOrder({
//         body: {
//           intent: this.isIntentCaptured
//             ? CheckoutPaymentIntent.Capture
//             : CheckoutPaymentIntent.Authorize,
//           ...purchaseUnits,
//         },
//       });
//       const isPaymentIntent = "id" in result;
//       return {
//         id: isPaymentIntent
//           ? (result.id as string)
//           : (data?.session_id as string),
//         data: {
//           ...result,
//         },
//       };
//     } catch (error) {
//       throw new MedusaError(
//         MedusaError.Types.UNEXPECTED_STATE,
//         `Initialize payment failed Error:${error.message}`
//       );
//     }
//   }
//
//   async deletePayment(
//     input: DeletePaymentInput
//   ): Promise<DeletePaymentOutput> {
//     return await this.cancelPayment(input);
//   }
//
//   async refundPayment(
//     paymentData: RefundPaymentInput
//   ): Promise<RefundPaymentOutput> {
//
//     const paypalOrder = paymentData.data as PaypalOrder;
//
//     if (paypalOrder.purchaseUnits?.length && paypalOrder.purchaseUnits[0].payments) {
//       const purchaseUnit = paypalOrder.purchaseUnits[0];
//       const isAlreadyCaptured = paypalOrder.purchaseUnits.some((pu) => pu.payments?.captures?.length);
//       if (!isAlreadyCaptured) {
//         throw new Error("Cannot refund an uncaptured payment");
//       }
//
//       const paymentId = purchaseUnit.payments?.captures![0].id as string;
//       const currencyCode = purchaseUnit.amount?.currencyCode as string;
//       const paymentsController = new PaymentsController(this.client_);
//       try {
//         await paymentsController.refundCapturedPayment({
//           captureId: paymentId,
//           prefer: 'return=minimal'
//         });
//
//         return await this.retrievePayment(paymentData);
//       } catch (error) {
//         this.logger_.error(error);
//         throw new Error("An error occurred in refundPayment");
//       }
//     }
//
//     throw new MedusaError(
//       MedusaError.Types.UNEXPECTED_STATE,
//       "An error occurred in refundPayment"
//     );
//   }
//
//   async retrievePayment(
//     paymentSessionData: RetrievePaymentInput
//   ): Promise<RetrievePaymentOutput> {
//     try {
//       const ordersController = new OrdersController(this.client_);
//       const paypalOrderId = paymentSessionData.data!.id as string;
//       const { result } = await ordersController.getOrder({
//         id: paypalOrderId,
//       });
//       if (result.id) {
//         return {
//           data: {
//             ...result,
//           },
//         };
//       }
//     } catch (error) {
//       throw new MedusaError(
//         MedusaError.Types.UNEXPECTED_STATE,
//         `An error occurred in retrievePayment Error:${error.message}`
//       );
//     }
//     throw new MedusaError(
//       MedusaError.Types.UNEXPECTED_STATE,
//       "An error occurred in retrievePayment"
//     );
//   }
//
//   async updatePayment(
//     context: UpdatePaymentInput
//   ): Promise<UpdatePaymentOutput> {
//     const ordersController = new OrdersController(this.client_);
//     try {
//       const paypalOrderId = (context.data!.id as PaypalOrder).id as string;
//       await ordersController.patchOrder({
//         id: paypalOrderId,
//         body: [
//           {
//             op: PatchOp.Replace,
//             value: {
//               amount: {
//                 currencyCode: context.currency_code,
//                 value: context.amount.toString(),
//               },
//             },
//           },
//         ],
//       });
//       return await this.retrievePayment(context);
//     } catch (error) {
//       throw new MedusaError(
//         MedusaError.Types.UNEXPECTED_STATE,
//         `An error occurred in updatePayment Error:${error.message}`
//       );
//     }
//   }
//
//   async getWebhookActionAndData(
//     webhookData: ProviderWebhookPayload["payload"]
//   ): Promise<WebhookActionResult> {
//     const resource = webhookData?.data.resource as any;
//
//     const verificationResponse = await this.constructWebhookEvent(
//       webhookData.data,
//       webhookData.headers
//     );
//
//     if (verificationResponse.verification_status === "SUCCESS") {
//       switch (webhookData.data.event_type) {
//         case "CHECKOUT.ORDER.APPROVED":
//           return {
//             action: PaymentActions.REQUIRES_MORE,
//             data: {
//               session_id: resource.custom_id as string,
//               amount: new BigNumber(resource.amount.value),
//             },
//           };
//
//         case "PAYMENT.CAPTURE.REFUNDED":
//           return {
//             action: PaymentActions.CANCELED,
//             data: {
//               session_id: resource.custom_id as string,
//               amount: new BigNumber(resource.amount.value),
//             },
//           };
//
//         case "PAYMENT.CAPTURE.COMPLETED":
//           return {
//             action: PaymentActions.SUCCESSFUL,
//             data: {
//               session_id: resource.custom_id as string,
//               amount: new BigNumber(resource.amount.value),
//             },
//           };
//         default:
//           return { action: PaymentActions.NOT_SUPPORTED };
//       }
//     } else {
//       this.logger_.warn(`⚠️ Webhook verification failed`);
//       return { action: PaymentActions.NOT_SUPPORTED };
//     }
//   }
//
//   private async constructWebhookEvent(
//     data,
//     headers: Record<string, unknown>
//   ): Promise<VerifyWebhookSignature> {
//     const credentials = btoa(
//       `${this.options_.clientId}:${this.options_.clientSecret}`
//     );
//     const res_token = await fetch(`${this.paypal_api_}/v1/oauth2/token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${credentials}`,
//       },
//       body: "grant_type=client_credentials",
//     });
//
//     const token = await res_token.json();
//
//     const res = await fetch(
//       `${this.paypal_api_}/v1/notifications/verify-webhook-signature`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token.access_token}`,
//         },
//         body: JSON.stringify({
//           auth_algo: headers["paypal-auth-algo"],
//           cert_url: headers["paypal-cert-url"],
//           transmission_id: headers["paypal-transmission-id"],
//           transmission_sig: headers["paypal-transmission-sig"],
//           transmission_time: headers["paypal-transmission-time"],
//           webhook_id: this.options_.webhookId,
//           webhook_event: data,
//         }),
//       }
//     );
//     return await res.json();
//   }
// }
//
// export default PaypalProviderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcm92aWRlcnMvcGF5bWVudC1wYXlwYWwvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFdBQVc7QUFDWCxZQUFZO0FBQ1osY0FBYztBQUNkLGlCQUFpQjtBQUNqQiwyQkFBMkI7QUFDM0Isd0JBQXdCO0FBQ3hCLHNCQUFzQjtBQUN0QiwwQkFBMEI7QUFDMUIsc0NBQXNDO0FBQ3RDLGFBQWE7QUFDYixzQ0FBc0M7QUFDdEMsV0FBVztBQUNYLDJCQUEyQjtBQUMzQiw0QkFBNEI7QUFDNUIsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUM1Qix5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQiwyQkFBMkI7QUFDM0Isd0JBQXdCO0FBQ3hCLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsd0JBQXdCO0FBQ3hCLDBCQUEwQjtBQUMxQiwyQkFBMkI7QUFDM0IsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4Qix5QkFBeUI7QUFDekIsNEJBQTRCO0FBQzVCLHlCQUF5QjtBQUN6Qix3QkFBd0I7QUFDeEIseUJBQXlCO0FBQ3pCLHNDQUFzQztBQUN0Qyw0Q0FBNEM7QUFDNUMsRUFBRTtBQUNGLFdBQVc7QUFDWCw2QkFBNkI7QUFDN0IsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQixZQUFZO0FBQ1osb0JBQW9CO0FBQ3BCLDBCQUEwQjtBQUMxQixzQ0FBc0M7QUFDdEMsd0ZBQXdGO0FBQ3hGLDZDQUE2QztBQUM3Qyw4Q0FBOEM7QUFDOUMsRUFBRTtBQUNGLGdDQUFnQztBQUNoQyxvQkFBb0I7QUFDcEIsS0FBSztBQUNMLEVBQUU7QUFDRiwrRUFBK0U7QUFDL0UsbUNBQW1DO0FBQ25DLCtCQUErQjtBQUMvQixnREFBZ0Q7QUFDaEQsK0JBQStCO0FBQy9CLG1EQUFtRDtBQUNuRCx5Q0FBeUM7QUFDekMsRUFBRTtBQUNGLGtDQUFrQztBQUNs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