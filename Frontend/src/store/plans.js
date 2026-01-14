import axios from 'axios';

export const fetchPlans = async () => {
  try {
    const response = await axios.get('https://planify-7z51.onrender.com/planify/v1/plans/getAllPlans');
    console.log('Fetched plans:', response.data.data);
    return response.data.data;

  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
};


// export const plans = [
//   {
//     id: 1,
//     name: "Diggin Cafe",
//     description: "Try Tiramisu",
//     isDone: true,
//     category: "Food",
//     createdAt: "2025-11-09",
//     completedAt: "2025-11-11",
//     images: []
//   },
//   {
//     id: 2,
//     name: "Uncle Peter Pankcakes",
//     description: "",
//     isDone: true,
//     category: "Food",
//     createdAt: "2025-10-11",
//     completedAt: "2025-10-14",
//     images: []
//   },
//   {
//     id: 3,
//     name: "Hocco icecream",
//     description: "",
//     isDone: true,
//     category: "Food",
//     createdAt: "2025-04-13",
//     completedAt: "2025-04-17",
//     images: []
//   },
//   {
//     id: 4,
//     name: "Uttam Nagar Shopping",
//     description: "",
//     isDone: true,
//     category: "Shopping",
//     createdAt: "2025-01-22",
//     completedAt: "2025-03-16",
//     images: []
//   },
//   {
//     id: 5,
//     name: "Momo weds Shawarma",
//     description: "Afgani Momos",
//     isDone: true,
//     category: "Food",
//     createdAt: "2025-09-05",
//     completedAt: "2025-09-09",
//     images: []
//   },
//   {
//     id: 6,
//     name: "Giani's Icecream",
//     description: "Waffle Sundae",
//     isDone: true,
//     category: "Food",
//     createdAt: "2025-12-13",
//     completedAt: "2025-12-23",
//     images: []
//   },
//   {
//     id: 7,
//     name: "Puri Bakers",
//     description: "Biscoff Cheese Cake",
//     isDone: true,
//     category: "Food",
//     createdAt: "2025-10-24",
//     completedAt: "2025-10-25",
//     images: []
//   },
//   {
//     id: 8,
//     name: "Badminton",
//     description: "",
//     isDone: true,
//     category: "Experiences",
//     createdAt: "2023-11-01",
//     completedAt: "2025-11-05",
//     images: []
//   },
//   {
//     id: 9,
//     name: "McDonalds",
//     description: "Mumbai Expressway",
//     isDone: true,
//     category: "Travel",
//     createdAt: "2025-01-12",
//     completedAt: "2025-01-15",
//     images: []
//   },
//   {
//     id: 10,
//     name: "Social",
//     description: "Hauz khas",
//     isDone: false,
//     category: "Food",
//     createdAt: "2025-03-02",
//     completedAt: "2025-04-15",
//     images: []
//   },
//   {
//     id: 11,
//     name: "32nd Avenue",
//     description: "Christmas Vibes and night view",
//     isDone: false,
//     category: "Experiences",
//     createdAt: "2025-03-04",
//     completedAt: "2025-04-15",
//     images: []
//   },
//   {
//     id: 12,
//     name: "Yamuna Expressway",
//     description: "Starbucks",
//     isDone: false,
//     category: "Travel",
//     createdAt: "2025-02-08",
//     completedAt: "2025-03-15",
//     images: []
//   },
//   {
//     id: 13,
//     name: "Murthal",
//     description: "Long Drive and Butter Parantha",
//     isDone: true,
//     category: "Places",
//     createdAt: "2025-06-04",
//     completedAt: "2025-08-15",
//     images: []
//   },
//   {
//     id: 14,
//     name: "Leopard Trail",
//     description: "",
//     isDone: true,
//     category: "Places",
//     createdAt: "2025-06-24",
//     completedAt: "2025-07-15",
//     images: []
//   }
// ];