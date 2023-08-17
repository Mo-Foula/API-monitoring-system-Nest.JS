import { Controller } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createBookDto: CreateBookDto) {
  //   return this.usersService.createUser(createBookDto)
  // }
}
