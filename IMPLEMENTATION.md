# Simple Kitchen App - End-to-End Implementation

This document describes the complete implementation for the combined **Form Demo** + **Simple Kitchen** application.

## 1) Project Structure

```
m3-simplekitchen-app/
  app.js
  start.js
  .env
  routes/
    index.js
  models/
    Registration.js
  views/
    layout.pug
    index.pug
    form.pug
    thank-you.pug
    registrations.pug
  public/
    css/
      styles.css
      form.css
    scss/
      styles.scss
      form.scss
      nav.scss
    images/
      louisiana-barbecued-shrimp.webp
    js/
      (bootstrap files)
```

## 2) Tech Stack

- **Node.js / Express**
- **MongoDB + Mongoose**
- **Pug templates**
- **SASS / CSS**

## 3) Environment Setup

`.env`:
```
DATABASE=mongodb://localhost:27017/simplekitchen
```

## 4) Running the App

Terminal 1 (MongoDB):
```
mongod
```

Terminal 2 (app):
```
npm install
npm run watch
```

Terminal 3 (SASS watch):
```
sass --watch public/scss:public/css
```

App runs on:
```
http://localhost:3000/
```

## 5) Routes

- `/` → Home page (Simple Kitchen)
- `/register` → Registration form
- `/thank-you` → Thank you page
- `/registrations` → Registrants list (basic auth)
- `/registrants` → Alias of registrants list (basic auth)

## 6) Authentication

Basic auth is enabled only for:
```
/registrations
/registrants
```

Current credentials:
```
Username: admin
Password: simplekitchen
```

Credentials are stored in:
```
users.htpasswd
```

## 7) Database

Mongoose model:
```
Registration { name: String, email: String }
```

MongoDB database:
```
simplekitchen
```

Collection:
```
registrations
```

Verify in MongoDB Compass:
```
mongodb://localhost:27017
```

## 8) Templates

### layout.pug
- Global header, nav, and footer
- Links CSS files

### index.pug
- Simple Kitchen hero (left text + right image)

### form.pug
- Two-panel layout
- Left: branding
- Right: register form + inline validation errors

### thank-you.pug
- Same two-panel layout
- Right: “Thank you for your registration!”

### registrations.pug
- Table of registrants styled to match screenshot

## 9) Styling

Primary styles:
```
public/css/styles.css
public/css/form.css
```

- `styles.css`: home page + nav + registrants table
- `form.css`: register page + errors + thank-you layout

## 10) Key Behavior

- Form validates name + email
- On success, registration is saved to MongoDB
- Thank-you screen is shown
- Registrants list shows submitted records

## 11) Notes

- Static `public/index-static.html` is kept only as reference.
- Home page is rendered using `views/index.pug`.

