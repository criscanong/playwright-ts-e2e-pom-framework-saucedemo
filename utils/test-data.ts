type LoginScenario = {
  username: string;
  password: string;
  expected: 'success' | 'error';
  message?: string;
};

export const users: Record<string, LoginScenario> = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    expected: 'success',
  },
  locked_out: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expected: 'error',
    message: 'Sorry, this user has been locked out.',
  },
  not_existent: {
    username: 'test',
    password: 'secret_sauce',
    expected: 'error',
    message: 'Username and password do not match any user in this service',
  },
  no_password: {
    username: 'locked_out_user',
    password: '',
    expected: 'error',
    message: 'Password is required',
  },
  no_user: {
    username: '',
    password: '',
    expected: 'error',
    message: 'Username is required',
  }
};