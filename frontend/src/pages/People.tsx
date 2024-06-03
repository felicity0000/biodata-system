import { useQuery } from 'react-query';
import { fetchPeople } from '../api-client';
import { PeopleType } from '../../../backend/src/models/people';

const PeopleList = () => {
  const { data } = useQuery<PeopleType[]>('fetchPeople', fetchPeople);

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-poppins text-3xl font-bold mb-4 text-center">People List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((person) => (
          <div key={person._id} className="bg-white shadow-md rounded overflow-hidden">
            <div className="relative w-full h-64 bg-gray-200">
              {person.imageUrls ? (
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${person.imageUrls})` }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
            </div>
            <div className="p-4 ">
              <p className="font-poppins"><span className="font-poppins font-bold">Name</span>:{person.firstName} {person.lastName}</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Date of Birth</span>: {new Date(person.DOB).toLocaleDateString()}</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Age</span>: {person.age} years</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Gender</span>: {person.gender}</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Religion</span>: {person.religion}</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Email</span>: {person.email}</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Telephone</span>: {person.telephone}</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Nationality</span>: {person.nationality}</p>
              <p className="font-poppins"><span className="font-poppins font-bold">Occupation</span>: {person.occupation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
