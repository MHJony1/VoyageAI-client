// Application constants

/**
 * Popular tourist countries shown in the Explore country filter.
 * Static list (not DB-derived) so users can filter by any major
 * destination; if a selected country has no destinations yet, the
 * results grid shows an appropriate empty state.
 */
export const POPULAR_COUNTRIES = [
  // Asia
  'Bangladesh',
  'Thailand',
  'Japan',
  'Vietnam',
  'Indonesia',
  'Malaysia',
  'India',
  'Nepal',
  'Sri Lanka',
  'Singapore',
  // Europe
  'France',
  'Italy',
  'Spain',
  'Switzerland',
  'Greece',
  // Middle East / Africa / Other
  'United Arab Emirates',
  'Maldives',
  'Turkey',
  'Egypt',
  'Morocco',
];

/**
 * Destination categories used across Explore filters and the admin
 * destination form. Single source of truth to avoid drift.
 */
export const DESTINATION_CATEGORIES = [
  'Beach',
  'Cultural',
  'Adventure',
  'Urban',
  'Mountain',
  'Wildlife',
  'Romantic',
  'Wellness',
];

/** Best-season options for the admin destination form. */
export const SEASONS = [
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
  'Year-round',
  'Spring & Autumn',
  'November to February',
  'March to May',
  'June to August',
  'September to November',
];

/** Common currencies for the admin destination form. */
export const CURRENCIES = [
  'USD - US Dollar',
  'EUR - Euro',
  'GBP - British Pound',
  'JPY - Japanese Yen',
  'BDT - Bangladeshi Taka',
  'INR - Indian Rupee',
  'THB - Thai Baht',
  'VND - Vietnamese Dong',
  'IDR - Indonesian Rupiah',
  'MYR - Malaysian Ringgit',
  'SGD - Singapore Dollar',
  'NPR - Nepalese Rupee',
  'LKR - Sri Lankan Rupee',
  'CHF - Swiss Franc',
  'TRY - Turkish Lira',
  'AED - UAE Dirham',
  'MVR - Maldivian Rufiyaa',
  'EGP - Egyptian Pound',
  'MAD - Moroccan Dirham',
];
