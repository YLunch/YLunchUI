export type RestaurantCreateDto = {
  name:string;
  phoneNumber: string;
  email: string;
  isOpen: boolean;
  isPublic: boolean;
  zipCode: string;
  country: string;
  city: string;
  streetNumber:string;
  streetName: string;
  addressExtraInformation: string;
  closingDates: [
    {
      closingDateTime: string;
    }
  ];
  placeOpeningTimes: [
    {
      dayOfWeek: number;
      OffsetInMinutes: number;
      DurationInMinutes: number;
    }
  ],
    orderOpeningTimes: [
    {
      dayOfWeek: number;
      OffsetInMinutes: number;
      DurationInMinutes: number;
    }
  ];
  base64Logo: string;
  base64Image: string;
}
