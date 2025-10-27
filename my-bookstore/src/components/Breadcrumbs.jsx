import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    '': 'Home',
    'products': 'Products',
    'cart': 'Shopping Cart',
    'checkout': 'Checkout',
    'orders': 'My Orders',
    'admin': 'Admin Dashboard',
    'manage-products': 'Manage Products',
    'customers': 'Customers',
    'login': 'Login',
    'register': 'Register'
  };

  // Don't show breadcrumbs on auth pages or home page
  const hideBreadcrumbsOn = ['login', 'register', 'admin-login', ''];
  const currentPath = pathnames[0] || '';
  
  if (pathnames.length === 0 || hideBreadcrumbsOn.includes(currentPath)) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 px-4 sm:px-6 lg:px-8">
      <Link 
        to="/" 
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = breadcrumbNameMap[pathname] || pathname;

        return (
          <React.Fragment key={pathname}>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-medium capitalize">
                {name}
              </span>
            ) : (
              <Link 
                to={routeTo} 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;