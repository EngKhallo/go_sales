export const status = ["pending", "approved", "rejected"] as const;

export const roles = [
  "Guest",
  "Admin",
  "Hotel Owner",
  "Hotel Manager",
  "User",
] as const;

export const RoomTypes = ["Single", "Double", "Twin", "Suite", "Presidential"] as const;

export const PaymentMethods = [
  "Zaad",
  "E-Dahab",
  "Credit Card",
  "Bank Account",
] as const;

export const Currency = [
  "USD",
  "SLSH",
  "Zaad-Dollar",
  "Zaad-Cash",
  "eDahab-Dollar",
  "eDahab-Cash",
  "Premier Wallet",
] as const;

export const BedConfigrations = [
  "1 Single Bed",
  "1 Double Bed",
  "1 Queen Bed",
  "1 King Bed",
  "2 Twin Beds",
  "2 Queen Beds",
  "3 Single Beds",
  "1 King Bed, 2 Twin Beds",
] as const