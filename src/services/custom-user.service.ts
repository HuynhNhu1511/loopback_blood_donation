import {UserService} from '@loopback/authentication';
import {Credentials} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import {CustomUser} from '../models';
import {CustomUserRepository} from '../repositories';

export class CustomUserService implements UserService<CustomUser, Credentials> {
  constructor(
    @repository(CustomUserRepository)
    public customUserRepository: CustomUserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<CustomUser> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.customUserRepository.findOne({
      where: {email: credentials.email},
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      foundUser.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: CustomUser): UserProfile {
    const userId = user.id?.toString();
    return {
      [securityId]: userId ?? '',
      email: user.email,
    };
  }
}
