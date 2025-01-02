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
- [ ] move .mdx blog posts to external place
- [ ] regional
  - [x] dev env
  - [x] http
  - [ ] https
    - [ ] certificate
    - [ ] update dns
  - [ ] merge into main, make sure ci is working for both branches
