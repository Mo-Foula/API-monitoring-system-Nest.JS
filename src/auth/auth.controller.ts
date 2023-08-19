import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { SignInUserDto } from './dto/sign-in-user.dto'
import { AuthService } from './auth.service'
import { SignUpUserDto } from './dto/sign-up-user.dto'
import { AuthGuard } from './auth.guard'
import { ClaimActions } from './claims/constants'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() signInUserDto: SignInUserDto) {
    return this.authService.login(signInUserDto)
  }

  @Post('/signup')
  registerUser(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.registerUser(signUpUserDto)
  }

  @UseGuards(AuthGuard('SignupAdmin', ClaimActions.create))
  @Post('/signupAdmin')
  registerAdmin(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.registerUser(signUpUserDto)
  }
}
