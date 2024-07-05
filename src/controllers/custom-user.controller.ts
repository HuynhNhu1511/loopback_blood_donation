// Uncomment these imports to begin using these cool features!

import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {genSalt, hash} from 'bcryptjs';
import {CustomUser} from '../models';
import {CustomUserRepository} from '../repositories';
import {CustomUserService} from '../services';

export class CustomUserController {
  constructor(
    @repository(CustomUserRepository)
    public customUserRepository: CustomUserRepository,
    @service(CustomUserService)
    public customUserService: CustomUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': CustomUser,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomUser, {
            title: 'New User',
          }),
        },
      },
    })
    newUser: CustomUser,
  ): Promise<CustomUser> {
    newUser.password = await hash(newUser.password, await genSalt());

    return this.customUserRepository.create(newUser);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CustomUser) credentials: CustomUser,
  ): Promise<{token: string}> {
    const user = await this.customUserService.verifyCredentials(credentials);

    const userProfile = this.customUserService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }
}
