import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { canPassAuthGuards, jwtConstants } from './auth.constants'
import { Request } from 'express'
import { NestMiddleware, Type, mixin } from '@nestjs/common'
import { NextFunction, request } from 'express'
import { AuthService } from 'src/auth/auth.service'
import { ClaimActions } from 'src/auth/claims/constants'
import { RequestExtended } from 'src/general_interfaces/request.interface'

// @Injectable()
// export class AuthGuardByRole implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest()
//     if (canPassAuthGuards.indexOf(request.originalUrl) !== -1) return true
//     const token = this.extractTokenFromHeader(request)
//     if (!token) {
//       throw new UnauthorizedException()
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: jwtConstants.secret,
//       })
//       // 💡 We're assigning the payload to the request object here
//       // so that we can access it in our route handlers
//       request['user'] = payload
//     } catch {
//       throw new UnauthorizedException()
//     }
//     return true
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? []
//     return type === 'Bearer' ? token : undefined
//   }
// }

export function AuthGuard(
  moduleName: string,
  action: ClaimActions,
): Type<CanActivate> {
  @Injectable()
  class AuthGuardGetUser implements CanActivate {
    constructor(
      private readonly authService: AuthService,
      private jwtService: JwtService,
    ) {}

    private async authorizeClaims(userId: number): Promise<boolean> {
      const result = await this.authService.isRoleAuthorizedForClaim(
        moduleName,
        action,
        userId,
      )
      return result
    }

    private async authorizeToken(token: string) {
      return await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? []
      return type === 'Bearer' ? token : undefined
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest()
      if (canPassAuthGuards.indexOf(req.originalUrl) !== -1) return true
      const token = this.extractTokenFromHeader(req)
      if (!token) {
        throw new UnauthorizedException()
      }
      try {
        const payload = await this.authorizeToken(token)
        req['user'] = payload
        const authorizedClaims = await this.authorizeClaims(payload.userId)
        if (!authorizedClaims) {
          throw new UnauthorizedException()
        }
        return true
      } catch {
        throw new UnauthorizedException()
      }
    }
  }

  return AuthGuardGetUser
}
