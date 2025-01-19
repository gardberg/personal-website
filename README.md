# gardberg.xyz

Code for my personal website gardberg.xyz

# Terraform

Created bucket to store terraform state in under /terraform/bootstrap.

### TODO

- [x] Fix syntax highlighting in blog posts
- [x] Add a separate component for blog posts
- [x] Make faviocon show
- [x] set up CD
- [x] set up https
- [x] add custom hostname
- [x] reduce image size
  - [x] removed unecessary packages
  - [x] multi stage build
- [ ] fix pdf preview on chrome mobile
  - a bit of a hassle, tried google docs hosting, slow
- [x] add rolling update & healthcheck endpoint
- [ ] move to firebase


### Dev

`firebase login`

`firebase projects:list`

Build and run locally:

`npm run build`

`firebase emulators:start` or `firebase serve --only hosting`

The first command emulates other more complex services, such as storage or authentication, while serve just serves static content.

- Created service account `github-action-872125068`
- Acces JSON stored in `FIREBASE_SERVICE_ACCOUNT_PERSONAL_WEBSITE_71699`
- PR & merge workflows created for main