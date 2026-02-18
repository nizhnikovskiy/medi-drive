# Medi Drive

A modern React application built with TypeScript, Material-UI, and Redux Toolkit.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI) v6** - Component library with CSS-in-JS (@emotion)
- **Redux Toolkit** - State management
- **React Hook Form** - Form state management
- **Yup** - Schema validation

## Project Structure

```
src/
├── app/
│   ├── store.ts         # Redux store configuration
│   ├── rootReducer.ts   # Combined reducers
│   └── hooks.ts         # Typed Redux hooks (useAppDispatch, useAppSelector)
├── features/            # Redux slices (feature-based modules)
├── theme/
│   └── theme.ts         # MUI theme configuration
├── components/          # Shared/reusable components
├── pages/               # Page-level components
├── App.tsx              # Root component
└── main.tsx             # Application entry point
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Redux Usage

### Create a new slice

Create a new file in `src/features/`, for example `src/features/auth/authSlice.ts`:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
```

### Add the slice to rootReducer

Update `src/app/rootReducer.ts`:

```typescript
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
```

### Use in components

```typescript
import { useAppDispatch, useAppSelector } from './app/hooks'
import { login, logout } from './features/auth/authSlice'

function MyComponent() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const handleLogin = () => {
    dispatch(login('John Doe'))
  }

  return (
    // Your component JSX
  )
}
```

## Form Validation with React Hook Form + Yup

```typescript
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField, Button } from '@mui/material'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

type FormData = yup.InferType<typeof schema>

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        type="password"
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit">Login</Button>
    </form>
  )
}
```

## MUI Theming

Customize the theme in `src/theme/theme.ts`:

```typescript
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Your Font Family',
  },
})

export default theme
```

## License

MIT
