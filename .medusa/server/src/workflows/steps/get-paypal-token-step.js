"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
// import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
// import { PAYPAL_MODULE } from "../../modules/paypal"
// import PaypalModuleService from "../../modules/paypal/service"
//
// const PAYPAL_TOKEN_CACHE_NAME = 'PAYPAL_TOKEN'
//
// const getPaypalTokenStepId = 'get-paypal-token-step'
// const getPaypalToken = createStep(
//   getPaypalTokenStepId,
//   async (_, { container }) => {
//     const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
//     const cacheModuleService = container.resolve(Modules.CACHE);
//     const paypalModuleService: PaypalModuleService = container.resolve(PAYPAL_MODULE);
//
//     const token = await cacheModuleService.get(PAYPAL_TOKEN_CACHE_NAME) as string
//
//     if (!token) {
//       const { access_token, expires_in } = await paypalModuleService.getToken()
//       await cacheModuleService.set(PAYPAL_TOKEN_CACHE_NAME, access_token, expires_in)
//       return new StepResponse({ token: access_token });
//     }
//
//
//     return new StepResponse({ token });
//
//
//   }
// )
//
// export default getPaypalToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBheXBhbC10b2tlbi1zdGVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy9nZXQtcGF5cGFsLXRva2VuLXN0ZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRkFBaUY7QUFDakYsK0VBQStFO0FBQy9FLHVEQUF1RDtBQUN2RCxpRUFBaUU7QUFDakUsRUFBRTtBQUNGLGlEQUFpRDtBQUNqRCxFQUFFO0FBQ0YsdURBQXVEO0FBQ3ZELHFDQUFxQztBQUNyQywwQkFBMEI7QUFDMUIsa0NBQWtDO0FBQ2xDLDBFQUEwRTtBQUMxRSxtRUFBbUU7QUFDbkUseUZBQXlGO0FBQ3pGLEVBQUU7QUFDRixvRkFBb0Y7QUFDcEYsRUFBRTtBQUNGLG9CQUFvQjtBQUNwQixrRkFBa0Y7QUFDbEYsd0ZBQXdGO0FBQ3hGLDBEQUEwRDtBQUMxRCxRQUFRO0FBQ1IsRUFBRTtBQUNGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLEVBQUU7QUFDRixNQUFNO0FBQ04sSUFBSTtBQUNKLEVBQUU7QUFDRixpQ0FBaUMifQ==