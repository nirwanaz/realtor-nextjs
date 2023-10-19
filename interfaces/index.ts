export interface Amenity {
    text: string;
}

export interface Amenities {
    amenities: Amenity[];
}

export interface Photos {
    id: string;
    url: string;
}

export interface Agency {
    logo: { 
        url: string 
    }
}

export interface FilterValues {
    [key: string]: any;
    purpose?: string;
    rentFrequency?: string;
    categoryExternalID?: string;
    minPrice?: number;
    maxPrice?: number;
    areaMax?: number;
    roomsMin?: number;
    bathsMin?: number;
    sort?: string;
    locationExternalIDs?: string;
  }

export interface UserAttributes {
    fullname: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegisterProps {
    [key: string]: string;
    fullname: string;
    email: string;
    password: string;
}