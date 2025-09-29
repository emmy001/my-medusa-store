"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { MedusaService } from "@medusajs/framework/utils";
// import { Logger } from "@medusajs/medusa";
// import { PayPalOptions } from "../../providers/payment-paypal/types";
// import HttpClient from "./utils/httpClient";
//
// type InjectedDependencies = {
//   logger: Logger;
// };
//
// class PaypalModuleService extends MedusaService({}) {
//   protected _logger: Logger;
//   protected _options: PayPalOptions;
//   protected _httpClient: HttpClient;
//
//   constructor(container: InjectedDependencies, options: PayPalOptions) {
//     super(...arguments);
//
//     this._options = options;
//     this._logger = container.logger;
//
//     this._httpClient = new HttpClient(this._options, this._logger);
//   }
//
//   async getToken(): Promise<{ access_token: string, expires_in: number }> {
//     const credentials = btoa(
//       `${this._options.clientId}:${this._options.clientSecret}`
//     );
//     const { access_token, expires_in } = await this._httpClient.request(
//       `/v1/oauth2/token`,
//       {
//         method: 'POST',
//         body: "grant_type=client_credentials",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Authorization": `Basic ${credentials}`
//         }
//       }
//     );
//
//     return { access_token, expires_in }
//   }
//
//   async getOrder({ orderId, token }: { orderId: string, token: string }): Promise<any> {
//     const order = await this._httpClient.request(
//       `/v2/checkout/orders/${orderId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );
//
//     return order;
//   }
// }
//
// export default PaypalModuleService;
//
//
// declare module "@medusajs/framework/types" {
//   export interface ModuleImplementations {
//     paypalModuleService: PaypalModuleService;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BheXBhbC9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTZEO0FBQzdELDZDQUE2QztBQUM3Qyx3RUFBd0U7QUFDeEUsK0NBQStDO0FBQy9DLEVBQUU7QUFDRixnQ0FBZ0M7QUFDaEMsb0JBQW9CO0FBQ3BCLEtBQUs7QUFDTCxFQUFFO0FBQ0Ysd0RBQXdEO0FBQ3hELCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLEVBQUU7QUFDRiwyRUFBMkU7QUFDM0UsMkJBQTJCO0FBQzNCLEVBQUU7QUFDRiwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDLEVBQUU7QUFDRixzRUFBc0U7QUFDdEUsTUFBTTtBQUNOLEVBQUU7QUFDRiw4RUFBOEU7QUFDOUUsZ0NBQWdDO0FBQ2hDLGtFQUFrRTtBQUNsRSxTQUFTO0FBQ1QsMkVBQTJFO0FBQzNFLDRCQUE0QjtBQUM1QixVQUFVO0FBQ1YsMEJBQTBCO0FBQzFCLGlEQUFpRDtBQUNqRCxxQkFBcUI7QUFDckIsaUVBQWlFO0FBQ2pFLG9EQUFvRDtBQUNwRCxZQUFZO0FBQ1osVUFBVTtBQUNWLFNBQVM7QUFDVCxFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLE1BQU07QUFDTixFQUFFO0FBQ0YsMkZBQTJGO0FBQzNGLG9EQUFvRDtBQUNwRCwwQ0FBMEM7QUFDMUMsVUFBVTtBQUNWLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0MsWUFBWTtBQUNaLFVBQVU7QUFDVixTQUFTO0FBQ1QsRUFBRTtBQUNGLG9CQUFvQjtBQUNwQixNQUFNO0FBQ04sSUFBSTtBQUNKLEVBQUU7QUFDRixzQ0FBc0M7QUFDdEMsRUFBRTtBQUNGLEVBQUU7QUFDRiwrQ0FBK0M7QUFDL0MsNkNBQTZDO0FBQzdDLGdEQUFnRDtBQUNoRCxNQUFNO0FBQ04sSUFBSSJ9