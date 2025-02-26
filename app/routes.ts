import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  // base
  layout('layouts/base.tsx', [
    index('routes/home.tsx'),
    route('sign-in', 'routes/sign-in.tsx'),
    route('page/:slug', 'routes/page.tsx'),
    route('profile/:id', 'routes/profile.tsx'),
  ]),

  // dashboard
  layout('layouts/dashboard.tsx', [
    route('dashboard', './routes/dashboard-home.tsx'),
    route('dashboard/:id', './routes/dashboard-page.tsx'),
  ]),
] satisfies RouteConfig
