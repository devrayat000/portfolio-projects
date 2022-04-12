export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5db30d94f70e6e80ebd5c2206f6b1ff7'),
  },
});
