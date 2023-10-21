type AllowedRoutes = {
    [key: string]: string[];
  };

export const allowedRoutes: AllowedRoutes = {
    Admin: [
      '/',
      '/hotels',
      '/rooms',
      '/charts',
      '/users',
      '/bookings',
      '/reports',
      '/hotelReports',
      '/bookingReports',
      '/financialReports',
      '/mostBookedHotel'
    ],
    Guest: [
      '/',
      '/hotels',
      '/rooms',
      '/bookings',
    ],
    User: [
      '/',
      '/hotels',
      '/rooms',
      '/bookings',
      '/reports',
      '/bookingReports',
    ],
  };