import Property from '@/components/property/Property';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Image from 'next/image'
import Link from 'next/link'

interface BannerProps {
  purpose: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
  buttonText: string;
  linkName: string;
  imageUrl: string;
}

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}: BannerProps) => (
  <div className="flex flex-wrap justify-center items-center m-10">
    <Image src={imageUrl} width={500} height={500} alt='banner' />
    <div className="p-5">
      <div className="text-gray-500 text-sm font-medium">{purpose}</div>
      <div className="text-3xl font-bold">{title1}<br/>{title2}</div>
      <div className="text-gray-700 text-lg py-3">{desc1}<br />{desc2}</div>
      <button type='button' className='text-xl bg-blue-600 text-white p-2 m-1 rounded-md'>
        <Link href={linkName}>{buttonText}</Link>
      </button>
    </div>
  </div>
)

export default async function Home() {

  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1='Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <div className="flex flex-wrap gap-2">
        {propertyForRent?.hits.map((property: any) => <Property property={property} key={property.id} />)}
      </div>

      <Banner
        purpose='BUY A HOME'
        title1='Find, Buy & own Your'
        title2='Dream Home'
        desc1='Explore from Apartments, land, builder floors,'
        desc2='villas and more'
        buttonText='Explore buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <div className="flex flex-wrap gap-2">
        {propertyForSale?.hits.map((property: any) => <Property property={property} key={property.id} />)}
      </div>
    </main>
  )
}
