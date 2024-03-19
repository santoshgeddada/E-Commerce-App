import {Navigate, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = Cookie.get('jwt_token')
  let isAuthenticated= true

  if (token === undefined) {
    isAuthenticated=false
  }


  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
    />
  );
}

export default ProtectedRoute