import Avatar from "./assets/avatar.png";
const now = Date.now();

const userSuggestions = [
  {
    _id: "1",
    name: "Michael Johnson",
    userName: "michaeljohnson",
    avatar: Avatar,
    isOnline: true,
  },
  {
    _id: "2",
    name: "Jane Smith",
    userName: "janesmith",
    avatar: Avatar,
    isOnline: true,
  },
  {
    _id: "3",
    name: "Bob Johnson",
    userName: "bobjohnson",
    avatar: Avatar,
    isOnline: false,
  },
  {
    _id: "4",
    name: "Sara Lee",
    userName: "saralee",
    avatar: Avatar,
    isOnline: false,
  },
  {
    _id: "5",
    name: "Tom Jones",
    userName: "tomjones",
    avatar: Avatar,
    isOnline: true,
  },
];

const post1 = {
  avatar: Avatar,
  userName: "Timothy Fischer",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod semper aliquam. Suspendisse non felis non lacus lacinia venenatis.",
  images: [
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  likes: ["John", "Jane", "Jack"],
  comments: [
    { user: "Megan", comment: "Great post!" },
    { user: "Bob", comment: "Awesome!" },
  ],
  createdAt: new Date(now - Math.random() * 1000000000),
};

const post2 = {
  userName: "John Aldren",
  avatar: Avatar,
  content:
    "Pellentesque eget arcu velit. Aliquam vel fermentum sapien. Nunc interdum tristique consectetur. Donec bibendum, ex in vestibulum pretium, mauris elit auctor elit, ac dictum turpis mauris quis metus.",
  images: [
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/10256429/pexels-photo-10256429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  likes: ["Alice", "Bob", "Charlie", "David"],
  comments: [
    { user: "Jane", comment: "Nice post!" },
    { user: "John", comment: "Great!" },
  ],
  createdAt: new Date(now - Math.random() * 1000000000),
};

const post3 = {
  userName: "Mark Taylor",
  avatar: Avatar,
  content:
    "Morbi eu ante augue. Morbi non libero ut lectus fringilla luctus. Sed eu enim vitae sapien tristique malesuada. Nunc ultricies, metus ut interdum varius, elit mi interdum mi, eu malesuada neque lectus eget sapien.",
  images: [
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/10256429/pexels-photo-10256429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/10216143/pexels-photo-10216143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  likes: ["Ethan", "Frank", "Grace"],
  comments: [
    { user: "Jack", comment: "Awesome post!" },
    { user: "Megan", comment: "Great!" },
  ],
  createdAt: new Date(now - Math.random() * 1000000000),
};

export { userSuggestions, post1, post2, post3 };
