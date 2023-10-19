import PropertyDetails from "@/components/property/PropertyDetails";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import React from "react";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${params.id}`);
  
  return <PropertyDetails propertyDetails={data} />;
};

export default PropertyDetailsPage;
