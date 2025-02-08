import { jwtDecode } from "jwt-decode"

interface User {
  id: number
  email: string
  role: string
  name: string
}

interface DecodedToken {
  sub: string
  email: string
  role: string
  name: string
  exp: number
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decoded = jwtDecode(token) as DecodedToken
    return decoded.exp > Date.now() / 1000
  } catch {
    return false
  }
}

// Get current user
export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// Check if user has required role
export const hasRole = (requiredRole: string): boolean => {
  const user = getCurrentUser()
  if (!user) return false

  const roles: { [key: string]: number } = {
    admin: 4,
    manager: 3,
    operator: 2,
    viewer: 1
  }

  return roles[user.role.toLowerCase()] >= roles[requiredRole.toLowerCase()]
}

// Check if user has permission for specific action
export const hasPermission = (action: string, resource: string): boolean => {
  const user = getCurrentUser()
  if (!user) return false

  // TODO: Implement more sophisticated permission checking
  // For now, just check roles
  switch (user.role.toLowerCase()) {
    case 'admin':
      return true
    case 'manager':
      return ['read', 'create', 'update'].includes(action.toLowerCase())
    case 'operator':
      return ['read', 'update'].includes(action.toLowerCase())
    case 'viewer':
      return action.toLowerCase() === 'read'
    default:
      return false
  }
}

// Logout user
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/auth/login'
}

// Login user
export const login = async (email: string, password: string) => {
  // TODO: Implement actual API call
  if (email === "admin@example.com" && password === "admin") {
    const mockUser = {
      id: 1,
      email,
      role: "admin",
      name: "Admin User"
    }
    localStorage.setItem('user', JSON.stringify(mockUser))
    localStorage.setItem('token', 'mock-jwt-token')
    return mockUser
  }
  throw new Error('Invalid credentials')
}

// Protected route HOC
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: string
) {
  return function WithAuthComponent(props: P) {
    if (!isAuthenticated()) {
      window.location.href = '/auth/login'
      return null
    }

    if (requiredRole && !hasRole(requiredRole)) {
      window.location.href = '/unauthorized'
      return null
    }

    return <WrappedComponent {...props} />
  }
}