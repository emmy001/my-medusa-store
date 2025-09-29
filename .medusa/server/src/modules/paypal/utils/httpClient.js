"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Logger } from "@medusajs/medusa";
// import { PayPalOptions } from "../../../providers/payment-paypal/types";
//
// class HttpClient {
//   protected _opiton: PayPalOptions;
//   protected _baseUrl: string;
//   protected defaultHeaders: any;
//   protected _logger: Logger;
//
//   constructor(options: PayPalOptions, logger: Logger) {
//     if (!options.clientId) {
//       throw new Error("Required option `clientId` is missing in PayPal plugin");
//     }
//     if (!options.clientSecret) {
//       throw new Error(
//         "Required option `clientSecret` is missing in PayPal plugin"
//       );
//     }
//     if (options.sandbox == undefined) {
//       throw new Error("Required option `sandbox` is missing in PayPal plugin");
//     }
//
//     this._opiton = options;
//     this._logger = logger;
//     this._baseUrl = this._opiton.sandbox
//       ? "https://api-m.sandbox.paypal.com"
//       : "https://api-m.paypal.com";
//     this.defaultHeaders = {
//       "Content-Type": "application/json",
//     };
//   }
//
//   async request(
//     endpoint,
//     { method = "GET", body = null, headers = {} }: any = {}
//   ) {
//     const url = this._baseUrl + endpoint;
//     const config: any = {
//       method,
//       headers: {...this.defaultHeaders,...headers}
//     };
//
//     if (typeof body === "string") {
//       config.body = body;
//     } else if (body !== null && typeof body === "object") {
//       config.body = JSON.stringify(body);
//     }
//     try {
//       const response = await fetch(url, config);
//       const data = await response.json();
//
//       if (!response.ok) {
//         throw {
//           message: data?.message || response.statusText || "HTTP error",
//           status: response.status,
//           data,
//         };
//       }
//
//       return data;
//     } catch (error) {
//       this._logger.error(error.message);
//       if (error instanceof TypeError) {
//         // 网络错误
//         throw { message: "Network error", error };
//       }
//
//       throw error;
//     }
//   }
// }
//
// export default HttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BheXBhbC91dGlscy9odHRwQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQTZDO0FBQzdDLDJFQUEyRTtBQUMzRSxFQUFFO0FBQ0YscUJBQXFCO0FBQ3JCLHNDQUFzQztBQUN0QyxnQ0FBZ0M7QUFDaEMsbUNBQW1DO0FBQ25DLCtCQUErQjtBQUMvQixFQUFFO0FBQ0YsMERBQTBEO0FBQzFELCtCQUErQjtBQUMvQixtRkFBbUY7QUFDbkYsUUFBUTtBQUNSLG1DQUFtQztBQUNuQyx5QkFBeUI7QUFDekIsdUVBQXVFO0FBQ3ZFLFdBQVc7QUFDWCxRQUFRO0FBQ1IsMENBQTBDO0FBQzFDLGtGQUFrRjtBQUNsRixRQUFRO0FBQ1IsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsMkNBQTJDO0FBQzNDLDZDQUE2QztBQUM3QyxzQ0FBc0M7QUFDdEMsOEJBQThCO0FBQzlCLDRDQUE0QztBQUM1QyxTQUFTO0FBQ1QsTUFBTTtBQUNOLEVBQUU7QUFDRixtQkFBbUI7QUFDbkIsZ0JBQWdCO0FBQ2hCLDhEQUE4RDtBQUM5RCxRQUFRO0FBQ1IsNENBQTRDO0FBQzVDLDRCQUE0QjtBQUM1QixnQkFBZ0I7QUFDaEIscURBQXFEO0FBQ3JELFNBQVM7QUFDVCxFQUFFO0FBQ0Ysc0NBQXNDO0FBQ3RDLDRCQUE0QjtBQUM1Qiw4REFBOEQ7QUFDOUQsNENBQTRDO0FBQzVDLFFBQVE7QUFDUixZQUFZO0FBQ1osbURBQW1EO0FBQ25ELDRDQUE0QztBQUM1QyxFQUFFO0FBQ0YsNEJBQTRCO0FBQzVCLGtCQUFrQjtBQUNsQiwyRUFBMkU7QUFDM0UscUNBQXFDO0FBQ3JDLGtCQUFrQjtBQUNsQixhQUFhO0FBQ2IsVUFBVTtBQUNWLEVBQUU7QUFDRixxQkFBcUI7QUFDckIsd0JBQXdCO0FBQ3hCLDJDQUEyQztBQUMzQywwQ0FBMEM7QUFDMUMsa0JBQWtCO0FBQ2xCLHFEQUFxRDtBQUNyRCxVQUFVO0FBQ1YsRUFBRTtBQUNGLHFCQUFxQjtBQUNyQixRQUFRO0FBQ1IsTUFBTTtBQUNOLElBQUk7QUFDSixFQUFFO0FBQ0YsNkJBQTZCIn0=