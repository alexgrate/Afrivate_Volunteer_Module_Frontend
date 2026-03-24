# Afrivate Volunteer Module – Complete Documentation

**Single source of truth** for the Afrivate volunteer platform: routes, pages, API, localStorage, user flows, and technical reference.  
For setup and run instructions, see [README.md](README.md).

---

## Table of contents

1. [Overview](#1-overview)
2. [Quick reference](#2-quick-reference)
3. [Full route index](#3-full-route-index)
4. [Page & component index](#4-page--component-index)
5. [API reference](#5-api-reference)
6. [LocalStorage reference](#6-localstorage-reference)
7. [Website functions & user flows](#7-website-functions--user-flows)
8. [Context & state](#8-context--state)
9. [Environment variables](#9-environment-variables)
10. [Assets & utilities](#10-assets--utilities)
11. [Guides & checklist](#11-guides--checklist)

---

## 1. Overview

**Afrivate** connects **Pathfinders** (volunteers) with **Enablers** (organizations/employers) for volunteering and opportunity matching.

| Item | Detail |
|------|--------|
| **Tech stack** | React 18, React Router v6 (HashRouter), Tailwind CSS |
| **Backend** | REST API at `https://afrivate-backend-production.up.railway.app` |
| **Auth** | JWT (access + refresh), Google OAuth optional |
| **Analytics** | Google Analytics (G-XDX60DZTG4), gated by cookie consent |

**Entry points:** `public/index.html` → `src/index.js` → `src/App.js` (routes, `UserProvider`, `CookieConsent`).

---

## 2. Quick reference

| Topic | Section |
|-------|--------|
| All URLs and which component they load | [§3 Full route index](#3-full-route-index) |
| What each page does and where it lives | [§4 Page & component index](#4-page--component-index) |
| Backend endpoints and request/response | [§5 API reference](#5-api-reference) |
| Every localStorage key and where it’s used | [§6 LocalStorage reference](#6-localstorage-reference) |
| Login, signup, pathfinder/enabler flows | [§7 Website functions & user flows](#7-website-functions--user-flows) |
| UserContext, auth, role | [§8 Context & state](#8-context--state) |
| Env vars (API URL, Google client ID, etc.) | [§9 Environment variables](#9-environment-variables) |

---

## 3. Full route index

The app uses **HashRouter** (e.g. `/#/login`). All routes are defined in `src/App.js`.

### 3.1 Public (no auth)

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Landing` | Main landing |
| `/landingpathfinder` | `LandingPathfinder` | Pathfinder landing |
| `/landingenabler` | `Landingenabler` | Enabler landing |
| `/opportunity` | `Opportunity` | Browse opportunities |
| `/volunteer-details` | `VolunteerDetails` | Opportunity detail (job from state or `jobId` query) |
| `/road` | `Road` (Roadmap) | Roadmap / learning |
| `/about` | `AboutUs` | About the platform |
| `/contact` | `ContactUs` | Contact form |
| `/privacy` | `PrivacyPolicy` | Privacy policy |
| `/deep-pay-info` | `DeepPayInfo` | Deep Pay info |

### 3.2 Auth (no auth required to view)

| Path | Component | Description |
|------|-----------|-------------|
| `/login` | `Login` | Email/password + Google OAuth |
| `/signup` | `SignUp` | Register (pathfinder or enabler) |
| `/forgot-password` | `ForgotPassword` | Request password reset |
| `/verify-otp` | `VerifyOTP` | OTP verification |
| `/reset-password` | `ResetPassword` | Set new password after OTP |

### 3.3 Pathfinder (protected; RequireAuth)

| Path | Component | Description |
|------|-----------|-------------|
| `/pathf` | `Pathf` (PathfinderDashboard) | Pathfinder dashboard |
| `/dashf` | `Pathf` | Alias for pathfinder dashboard |
| `/apply/:opportunityId` | `ApplyApplication` | Apply to an opportunity |
| `/bookmarks` | `Bookmarks` | Saved opportunities |
| `/edit-new-profile` | `EditNewProfile` | Pathfinder profile editor |

### 3.4 Enabler (protected; RequireAuth)

| Path | Component | Description |
|------|-----------|-------------|
| `/enabler/dashboard` | `EnablerDashboard` | Enabler dashboard |
| `/create-opportunity` | `CreateOpportunity` | Create new opportunity |
| `/enabler/opportunities-posted` | `OpportunitiesPosted` | List posted opportunities |
| `/enabler/opportunity/:id` | `OpportunityDetails` | View opportunity |
| `/enabler/edit-opportunity/:id` | `EditOpportunity` | Edit opportunity |
| `/enabler/profile` | `EnablerProfile` | View enabler profile |
| `/enabler/edit-profile` | `EditProfile` | Edit enabler profile |
| `/enabler/profile-setup` | `EnablerProfileSetup` | Initial enabler setup |
| `/enabler/recommendations` | `Recommendations` | Recommendations |
| `/enabler/settings` | `Settings` | Account settings |
| `/enabler/pathfinder/:id` | `PathfinderProfile` | View pathfinder (enabler view) |
| `/enabler/contact/:id` | `ContactPathfinder` | Contact pathfinder |
| `/enabler/bookmarked-pathfinders` | `EnablerPathfinderBookmarks` | Bookmarked pathfinders |
| `/enabler/applicants/:id` | `Applicants` | Applicants for an opportunity |

### 3.5 Other protected (RequireAuth, no role)

| Path | Component | Description |
|------|-----------|-------------|
| `/emppro` | `Emppro` | Employer profile page |
| `/dash-employer` | `DashEmployer` | Employer dashboard |
| `/dash-freelance` | `DashFreelance` | Freelance dashboard |
| `/dashboard` | `Dashboard` | Main dashboard (with Navbar) |
| `/profile` | `Profile` | User profile (with Navbar) |
| `/kyc` | `KYCForm` | KYC form (with Navbar) |

**Note:** There is no catch-all route (`path="*"`). Unknown URLs render nothing; consider adding a 404 page.

---

## 4. Page & component index

### 4.1 Pages (by folder)

| File | Route(s) | Purpose |
|------|----------|---------|
| **auth/** | | |
| `Login.js` | `/login` | Email/password + Google; role detection; redirect to dashboard |
| `SignUp.js` | `/signup` | Register pathfinder/enabler; optional token then profile-setup/edit-new-profile |
| `ForgotPassword.js` | `/forgot-password` | Request reset email |
| `VerifyOTP.js` | `/verify-otp` | Verify OTP |
| `ResetPassword.js` | `/reset-password` | New password after OTP |
| **enabler/** | | |
| `EnablerDashboard.js` | `/enabler/dashboard` | Welcome, opportunities, applicants |
| `CreateOpportunity.js` | `/create-opportunity` | Multi-step create opportunity |
| `OpportunitiesPosted.js` | `/enabler/opportunities-posted` | List, view, delete opportunities |
| `OpportunityDetails.js` | `/enabler/opportunity/:id` | View one opportunity |
| `EditOpportunity.js` | `/enabler/edit-opportunity/:id` | Edit opportunity |
| `EnablerProfile.js` | `/enabler/profile` | View enabler profile |
| `EditProfile.js` | `/enabler/edit-profile` | Edit enabler profile |
| `EnablerProfileSetup.js` | `/enabler/profile-setup` | First-time enabler setup |
| `Recommendations.js` | `/enabler/recommendations` | Recommended pathfinders |
| `Settings.js` | `/enabler/settings` | Profile, password, document |
| `PathfinderProfile.js` | `/enabler/pathfinder/:id` | View pathfinder, bookmark |
| `ContactPathfinder.js` | `/enabler/contact/:id` | Send message to pathfinder |
| `EnablerPathfinderBookmarks.js` | `/enabler/bookmarked-pathfinders` | List bookmarked pathfinders |
| `Applicants.js` | `/enabler/applicants/:id` | Applicants for opportunity |
| **pathfinder/** | | |
| `PathfinderDashboard.js` (Pathf) | `/pathf`, `/dashf` | Pathfinder home, opportunities, applications |
| `Opportunity.js` | `/opportunity` | List/search opportunities |
| `VolunteerDetails.js` | `/volunteer-details` | One opportunity; apply, bookmark |
| `ApplyApplication.js` | `/apply/:opportunityId` | Application form |
| `Bookmarks.js` | `/bookmarks` | Saved opportunities |
| `EditNewProfile.js` | `/edit-new-profile` | Pathfinder profile form |
| **Root pages** | | |
| `Landing.js` | `/` | Main landing |
| `LandingPathfinder.js` | `/landingpathfinder` | Pathfinder landing |
| `Landingenabler.js` | `/landingenabler` | Enabler landing |
| `Dashboard.js` | `/dashboard` | Generic dashboard |
| `Profile.js` | `/profile` | Generic profile |
| `Roadmap.js` | `/road` | Roadmap |
| `AboutUs.js` | `/about` | About |
| `ContactUs.js` | `/contact` | Contact |
| `PrivacyPolicy.js` | `/privacy` | Privacy |
| `DeepPayInfo.js` | `/deep-pay-info` | Deep Pay |
| `emppro.js` | `/emppro` | Employer profile |
| `Dash-employer.js` | `/dash-employer` | Employer dashboard |
| `Dash-freelance.js` | `/dash-freelance` | Freelance dashboard |

### 4.2 Key components

| Component | Path | Purpose |
|-----------|------|---------|
| `RequireAuth` | `components/auth/RequireAuth.js` | Redirect to `/login` if no token; optional role check |
| `GoogleAuthButton` | `components/auth/GoogleAuthButton.js` | Google sign-in/sign-up |
| `Navbar` (auth) | `components/auth/Navbar.js` | Pathfinder/enabler nav (notifications, profile) |
| `EnablerNavbar` | `components/auth/EnablerNavbar.js` | Enabler nav links |
| `Navbar` (layout) | `components/layout/Navbar.js` | Dashboard/profile/kyc nav |
| `Input` | `components/common/Input.js` | Text input |
| `PasswordInput` | `components/common/PasswordInput.js` | Password with show/hide toggle |
| `Button` | `components/common/Button.js` | Button |
| `Modal` | `components/common/Modal.js` | Modal dialog |
| `Toast` | `components/common/Toast.js` | Toast notifications |
| `CookieConsent` | `components/CookieConsent.js` | Cookie consent banner |
| `KYCForm` | `components/forms/KYCForm.js` | KYC form |

---

## 5. API reference

**Client:** `src/services/api.js`  
**Base URL:** `process.env.REACT_APP_API_BASE_URL` or `https://afrivate-backend-production.up.railway.app`  
**Prefix:** `process.env.REACT_APP_API_PREFIX` or `/api`  
**Auth:** `Authorization: Bearer <access_token>`. Tokens stored in localStorage: `afrivate_access`, `afrivate_refresh`. Role: `afrivate_role` (`"enabler"` \| `"pathfinder"`).

**Error handling:** `getApiErrorMessage(err)` turns API errors into a single string. On 401, the client tries token refresh and retries once.

### 5.1 Auth (`api.auth`)

| Method | Path | Body / use | Used in |
|--------|------|-----------|--------|
| `login(body)` | POST `/auth/login/` | username_or_email, password | — |
| `token(body)` | POST `/auth/token/` | email, password → access, refresh | Login, SignUp |
| `register(body)` | POST `/auth/register/` | username, email, password, password2, role | SignUp |
| `logout()` | POST `/auth/logout/` | Bearer | UserContext, navbars |
| `tokenRefresh(refresh)` | POST `/auth/token/refresh/` | refresh | Internal (401 retry) |
| `forgotPassword(body)` | POST `/auth/forgot-password/` | email | ForgotPassword |
| `verifyOtp(body)` | POST `/auth/verify-otp/` | email, otp | VerifyOTP |
| `resetPassword(body)` | POST `/auth/reset-password/` | email, new_password, confirm_password | ResetPassword |
| `changePassword(body)` | POST `/auth/change-password/` | old_password, new_password, confirm_password | Settings |
| `verifyEmail(body)` | POST `/auth/verify-email/` | token | — |
| `google(body)` | POST `/auth/google/` | id_token, role? | GoogleAuthButton |

### 5.2 Profile (`api.profile`)

| Method | Path | Use | Used in |
|--------|------|-----|--------|
| `enablerGet()` | GET `/profile/enablerprofile/` | Get enabler profile | UserContext, Login, GoogleAuth, EnablerProfile, EditProfile, Settings, EnablerProfileSetup |
| `enablerCreate(body)` | POST `/profile/enablerprofile/` | Create | EnablerProfileSetup |
| `enablerUpdate(body)` | PUT `/profile/enablerprofile/` | Full update | EnablerProfileSetup, EditProfile |
| `enablerPatch(body)` | PATCH `/profile/enablerprofile/` | Partial update | Settings |
| `pathfinderGet()` | GET `/profile/pathfinderprofile/` | Get pathfinder profile | UserContext, Login, GoogleAuth, EditNewProfile |
| `pathfinderCreate(body)` | POST `/profile/pathfinderprofile/` | Create | EditNewProfile |
| `pathfinderUpdate(body)` | PUT `/profile/pathfinderprofile/` | Full update | — |
| `pathfinderPatch(body)` | PATCH `/profile/pathfinderprofile/` | Partial update | EditNewProfile |
| `pictureGet()` | GET `/profile/profile/picture/` | Get picture | EditNewProfile |
| `picturePatch(formData)` | PATCH `/profile/profile/picture/` | Upload picture | EditNewProfile |

### 5.3 Bookmark (`api.bookmark`)

| Method | Path | Use | Used in |
|--------|------|-----|--------|
| `list()` | GET `/bookmark/bookmarks/` | List bookmarks | PathfinderDashboard, VolunteerDetails, Opportunity, Bookmarks |
| `create(body)` | POST `/bookmark/bookmarks/` | Create (e.g. opportunity_id) | PathfinderProfile |
| `delete(id)` | DELETE `/bookmark/bookmarks/{id}/delete/` | Delete bookmark | PathfinderDashboard, Bookmarks, VolunteerDetails |
| `opportunitiesList()` | GET `/bookmark/opportunities/` | List opportunities | PathfinderDashboard, EnablerDashboard, Opportunity, OpportunitiesPosted |
| `opportunitiesCreate(body)` | POST `/bookmark/opportunities/` | Create opportunity | CreateOpportunity |
| `opportunitiesSavedList()` | GET `/bookmark/opportunities/saved/` | Saved opportunities | Bookmarks |
| `opportunitiesSavedCreate(body)` | POST `/bookmark/opportunities/saved/` | Save opportunity | PathfinderDashboard, VolunteerDetails, Opportunity |

### 5.4 Notifications (`api.notifications`)

| Method | Path | Use | Used in |
|--------|------|-----|--------|
| `list()` | GET `/notifynotifications/` | List | Navbar (auth) |
| `create(body)` | POST `/notifynotifications/` | Create | ApplyApplication |
| `get(id)` | GET `/notifynotifications/{id}/` | Get one | Navbar |
| `update(id, body)` | PUT `/notifynotifications/{id}/` | Update | Navbar |
| `delete(id)` | DELETE `/notifynotifications/{id}/` | Delete | Navbar |

### 5.5 Waitlist (`api.waitlist`)

| Method | Path | Use | Used in |
|--------|------|-----|--------|
| `create(body)` | POST `/waitlist/` | email, name? | Not used in app |
| `stats()` | GET `/waitlist/stats/` | Admin stats | Not used in app |

**Live API docs:** https://afrivate-backend-production.up.railway.app/docs/

---

## 6. LocalStorage reference

All keys used in the app, where they are used, and what they store.

### 6.1 Auth & API (from `api.js`)

| Key | Purpose | Read/Write |
|-----|---------|------------|
| `afrivate_access` | JWT access token | R/W by api.js |
| `afrivate_refresh` | JWT refresh token | R/W by api.js |
| `afrivate_role` | `"enabler"` or `"pathfinder"` | R/W by api.js |

### 6.2 Cookie consent

| Key | Purpose | Used in |
|-----|---------|--------|
| `afrivate_cookie_consent` | Cookie consent choices (JSON) | `utils/cookieConsent.js` |

### 6.3 Pathfinder

| Key | Purpose | Used in |
|-----|---------|--------|
| `userProfile` | Pathfinder profile (display name, title, location, etc.) | Navbar, PathfinderDashboard, EditNewProfile, ApplyApplication |
| `hasCompletedProfile` | `"true"` \| `"false"` | SignUp, GoogleAuthButton, EditNewProfile |
| `bookmarkedJobs` | Array of opportunity IDs (saved by pathfinder) | VolunteerDetails, Bookmarks |
| `bookmarkedJobsData` | Array of full opportunity objects for bookmarks | VolunteerDetails, Bookmarks |
| `opportunityListCache` | Cached opportunity list from API or fallback | Opportunity, ApplyApplication |

### 6.4 Enabler

| Key | Purpose | Used in |
|-----|---------|--------|
| `enablerProfile` | Enabler profile (name, bio, contact, etc.) JSON | Settings, EnablerDashboard, EnablerProfile, EditProfile, EnablerProfileSetup, emppro |
| `hasCompletedEnablerProfile` | `"true"` \| `"false"` | SignUp, EnablerProfileSetup |
| `enablerOpportunities` | Array of posted opportunities (JSON) | CreateOpportunity, EnablerDashboard, OpportunitiesPosted, OpportunityDetails, EditOpportunity, Applicants, PathfinderDashboard, ApplyApplication, VolunteerDetails, Bookmarks |
| `opportunityCustomQuestions` | Custom questions per opportunity (JSON) | CreateOpportunity, EditOpportunity, ApplyApplication |
| `enablerDocumentFileName` | Name of uploaded document (e.g. company doc) | Settings |
| `bookmarkedPathfinders` | Array of pathfinder IDs bookmarked by enabler | PathfinderProfile, EnablerPathfinderBookmarks |
| `enablerContactMessages` | Messages sent to pathfinders (JSON array) | ContactPathfinder |
| `bookmarkedPathfindersData` | (If used) Cached pathfinder data for bookmarks | EnablerPathfinderBookmarks (savedData) |

### 6.5 Applications

| Key | Purpose | Used in |
|-----|---------|--------|
| `pathfinderApplications` | Array of applications (pathfinder applications to opportunities) | ApplyApplication, EnablerDashboard, Applicants, Recommendations, EnablerPathfinderBookmarks |

### 6.6 Other

| Key | Purpose | Used in |
|-----|---------|--------|
| `appProfile` | Generic app profile (Dashboard/Profile) | Profile.js |
| `kycFormData` | KYC form data (JSON) | KYCForm.js |
| `discoverQuery` | Search query for opportunities (sessionStorage in some flows) | Landing (sessionStorage) |

---

## 7. Website functions & user flows

### 7.1 Pathfinder flow

1. Land on `/` or `/landingpathfinder`.
2. Sign up (`/signup`) or log in (`/login` or Google).
3. Complete profile at `/edit-new-profile`.
4. Browse opportunities at `/opportunity`; open `/volunteer-details` (with job in state or `jobId`).
5. Bookmark or apply from volunteer-details; apply at `/apply/:opportunityId`.
6. Manage bookmarks at `/bookmarks`.
7. Dashboard at `/pathf` or `/dashf`.

### 7.2 Enabler flow

1. Land on `/` or `/landingenabler`.
2. Sign up or log in (enabler role).
3. Profile setup at `/enabler/profile-setup`.
4. Create opportunities at `/create-opportunity`.
5. Manage at `/enabler/opportunities-posted`, `/enabler/opportunity/:id`, `/enabler/edit-opportunity/:id`.
6. View applicants at `/enabler/applicants/:id`; view pathfinder at `/enabler/pathfinder/:id`; contact at `/enabler/contact/:id`.
7. Bookmarked pathfinders at `/enabler/bookmarked-pathfinders`; recommendations at `/enabler/recommendations`.
8. Settings at `/enabler/settings`.

### 7.3 Auth flow

- **Login:** Email + password → `api.auth.token` → `api.setTokens` → role detection (enablerGet then pathfinderGet if needed) → `api.setRole` → `refetchUser` → redirect to enabler or pathfinder dashboard. No silent fallback to pathfinder if enabler API fails; user sees error.
- **Google:** `GoogleAuthButton` → `api.auth.google` → same token/role/refetch/redirect. Errors passed to `onError` callback.
- **Sign up:** `api.auth.register` → optional `api.auth.token` → set tokens → redirect to profile-setup or edit-new-profile. If token exchange fails, error shown.
- **Forgot password:** `/forgot-password` → `api.auth.forgotPassword` → `/verify-otp` → `api.auth.verifyOtp` → `/reset-password` → `api.auth.resetPassword`.

---

## 8. Context & state

### 8.1 UserContext

- **Provider:** `UserProvider` in `App.js`.
- **Hook:** `useUser()` → `{ user, loading, error, updateUser, logout, refetchUser, clearError }`.
- **Behavior:**
  - With token: if `afrivate_role` is `enabler` or `pathfinder`, fetches that profile; if no role, tries `enablerGet` first; on enabler **failure** (throw) sets `error` and does **not** try pathfinder. If enabler succeeds with no id, then tries `pathfinderGet` for role detection.
  - On profile fetch failure, sets `error` (message from `getApiErrorMessage`) and `user` null.
  - Dashboards show loading spinner when `loading`; when `error && !user` they show the error and a “Log out and sign in again” action.

### 8.2 RequireAuth

- Checks `getAccessToken()`. No token → redirect to `/login`.
- If `role` prop is passed, checks `getRole()`; redirects to correct dashboard or login if role mismatch.

---

## 9. Environment variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `REACT_APP_API_BASE_URL` | Backend base URL | `https://afrivate-backend-production.up.railway.app` |
| `REACT_APP_API_PREFIX` | API path prefix | `/api` |
| `REACT_APP_GOOGLE_CLIENT_ID` | Google OAuth client ID | — (optional; disables Google button if unset) |
| `REACT_APP_CV_UPLOAD_URL` | CV upload endpoint (if used) | — |

See `.env.example` for templates.

---

## 10. Assets & utilities

### 10.1 Assets

- **Primary:** `src/Assets/` (images, video, e.g. `bg-video.mp4`).
- **Public:** `public/` (favicon, logos, manifest, robots.txt).

### 10.2 Utilities

| File | Purpose |
|------|---------|
| `utils/cookieConsent.js` | Cookie consent load/save (`afrivate_cookie_consent`). |
| `utils/gtag.js` | Load Google Analytics script after consent. |
| `utils/pathfinderData.js` | Pathfinder seed/sample data helpers. |
| `utils/applicationUtils.js` | Application helpers (e.g. `hasAppliedToOpportunity`). |

---

## 11. Guides & checklist

### 11.1 Development

- **Run:** `npm start`
- **Build:** `npm run build`
- **Tests:** `npm test`
- Use `.env` for `REACT_APP_API_BASE_URL`, `REACT_APP_GOOGLE_CLIENT_ID` as needed.

### 11.2 Route/link checklist

- All routes in §3 map to existing components in `src/`.
- Protected routes use `RequireAuth`; enabler-specific routes require enabler role where applicable.
- No catch-all 404 route; consider adding one.

### 11.3 API vs localStorage

- **Auth, profile, bookmarks, notifications:** Backend API when logged in; see §5.
- **Applications (pathfinder applications to opportunities):** No backend API in this doc; stored in `pathfinderApplications` (localStorage).
- **Enabler opportunities:** Created via `api.bookmark.opportunitiesCreate`; list from API when logged in; many pages also read/write `enablerOpportunities` for cache/offline or legacy behavior.
- **Cookie consent:** localStorage only (`afrivate_cookie_consent`).

### 11.4 Orphan / unreachable pages

These components exist but have **no route** in `App.js`:

- `Community.js`
- `subm.js`
- `Register.js` (use `/signup` instead)

`Dash-employer.js` and `Dash-freelance.js` **are** routed at `/dash-employer` and `/dash-freelance`.

---

*This document consolidates the former WEBSITE_DOCUMENTATION, ROUTES, ROUTES_API_REQUIREMENTS, LOCALSTORAGE_ROUTES, API_DOCS, and audit/checklist guides. Last updated: February 2025.*
