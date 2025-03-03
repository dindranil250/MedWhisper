/** @format */

import React from "react";
import { Star, Award, ThumbsUp } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  summary: string;
  rating: number;
  experience: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Neurology",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    summary:
      "Specializes in advanced neurological disorders with 15+ years of experience using cutting-edge technology.",
    rating: 4.9,
    experience: "15+ years",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    summary:
      "Harvard-trained cardiologist focused on preventative care and innovative treatment approaches.",
    rating: 4.8,
    experience: "12 years",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    summary:
      "Compassionate pediatrician dedicated to child wellness and development with a focus on family-centered care.",
    rating: 4.9,
    experience: "10 years",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Oncology",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    summary:
      "Leading oncologist pioneering research in targeted therapies and personalized cancer treatment plans.",
    rating: 4.7,
    experience: "18 years",
  },
];

const DoctorCards: React.FC = () => {
  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Expert Physicians
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our platform is trusted by leading medical professionals worldwide.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2"
            >
              <div className="flex-shrink-0 ">
                <img
                  className="w-[250px] h-[250px] object-cover mx-auto rounded-lg"
                  src={doctor.image}
                  alt={doctor.name}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-blue-600">
                      {doctor.specialty}
                    </p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {doctor.name}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {doctor.summary}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <Award className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Experience
                    </p>
                    <p className="text-sm text-gray-500">{doctor.experience}</p>
                  </div>
                  <div className="ml-auto flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-500">
                      Recommends MedWhisper
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorCards;
