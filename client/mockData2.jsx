import { v4 as uuidv4 } from "uuid";
// import Avatar from "./src/assets/avatar.png";

// Mock Data for users.
const users = [
  {
    // user[0]
    id: uuidv4(),
    fullName: "John Doe",
    userName: "johndoe",
    email: "john@gmail.com",
    password: "Merny@2023",
    avatar: "https://www.w3schools.com/w3images/avatar2.png",
    gender: "Male",
    // followers: [users[1].id, users[2].id, users[3].id],
    // following: [users[1]],
  },
  {
    // user[1]
    id: uuidv4(),
    fullName: "Jane Smith",
    userName: "janesmith",
    email: "jane@gmail.com",
    password: "Merny@2023",
    gender: "Female",
    avatar: "https://www.w3schools.com/w3images/avatar4.png",
    // followers: [users[0].id],
    // following: [users[0].id, users[4].id],
  },
  {
    // user[2]
    id: uuidv4(),
    fullName: "Bob Johnson",
    userName: "bobjohnson",
    email: "bob@gmail.com",
    password: "Merny@2023",
    gender: "Male",
    avatar: "https://www.w3schools.com/w3images/avatar3.png",
    // followers: [],
    // following: [users[0].id, users[4].id],
  },
  {
    // user[3]
    id: uuidv4(),
    fullName: "Samantha Lee",
    userName: "samlee",
    email: "samantha@gmail.com",
    password: "Merny@2023",
    gender: "Female",
    avatar: "https://www.w3schools.com/w3images/avatar5.png",
    // followers: [],
    // following: [users[0].id, users[4].id, users[1].userId],
  },
  {
    // user[4]
    id: uuidv4(),
    fullName: "Tom Williams",
    userName: "tomwilliams",
    email: "tom@gmail.com",
    password: "Merny@2023",
    gender: "Male",
    avatar: "https://www.w3schools.com/w3images/avatar2.png",
    // followers: [users[2], users[3]],
    // following: [],
  },
];

// console.log(`users: ${users}`);

// Mock users suggestions:

const userSuggestions = [
  {
    id: users[0].id,
    fullName: users[0].fullName,
    userName: users[0].userName,
    avatar: users[0].avatar,
    isOnline: true,
  },
  {
    id: users[1].id,
    fullName: users[1].fullName,
    userName: users[1].userName,
    avatar: users[1].avatar,
    isOnline: true,
  },
  {
    id: users[2].id,
    fullName: users[2].fullName,
    userName: users[2].userName,
    avatar: users[2].avatar,
    isOnline: false,
  },
  {
    id: users[3].id,
    fullName: users[3].fullName,
    userName: users[3].userName,
    avatar: users[3].avatar,
    isOnline: false,
  },
  {
    id: users[4].id,
    fullName: users[4].fullName,
    userName: users[4].userName,
    avatar: users[4].avatar,
    isOnline: true,
  },
];
console.log("userSuggestions: ", userSuggestions);
// Mock data for posts
const posts = [
  {
    id: uuidv4(),
    avatar: users[0].avatar,
    userName: users[0].userName,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id risus tincidunt, fermentum ex sed, cursus massa. Praesent eu libero malesuada, tempor enim vel, lobortis tellus. Vivamus vitae eros eget nibh tincidunt egestas. Duis mattis bibendum magna, nec tincidunt est fermentum a. Nulla facilisi.",
    images: [
      "https://picsum.photos/id/1019/500/500",
      "https://picsum.photos/id/1024/500/500",
    ],
    likes: [users[1].userId, users[2].userId],
    comments: [
      {
        content: "Nice post!",
        user: users[2].userId,
        likes: [users[1].userId],
      },
      {
        content: "This is really helpful. Thanks for sharing!",
        user: users[3].userId,
        likes: [users[1].userId, users[2].userId],
      },
      {
        content: "Great job!",
        user: users[3].userId,
        likes: [],
      },
    ],
    user: users[0].userId,
  },
  {
    id: uuidv4(),
    avatar: users[1].avatar,
    userName: users[1].userName,
    content:
      "Sed bibendum malesuada dolor, nec iaculis leo placerat eu. Sed hendrerit magna vel felis vulputate congue. Nunc euismod est nec enim rhoncus lacinia. Etiam sed ante aliquam, efficitur urna quis, sodales ipsum. Fusce commodo consectetur dui, a fermentum nunc feugiat at. Cras eleifend nec lectus sit amet aliquam. In in commodo tortor, ut ultricies erat.",
    images: ["https://picsum.photos/id/1035/500/500"],
    likes: [users[0].userId, users[3].userId],
    comments: [
      {
        content: "Nice one!",
        user: users[2].userId,
        likes: [users[0].userId, users[1].userId],
      },
      {
        content: "Really informative. Thanks!",
        user: users[4].userId,
        likes: [users[3].userId],
      },
      {
        content: "Awesome!",
        user: users[0].userId,
        likes: [],
        reply: [
          {
            content: "Thanks!",
            user: users[1].userId,
            likes: [users[0].userId],
          },
          {
            content: "Agreed! Keep up the great work.",
            user: users[3].userId,
            likes: [],
          },
        ],
      },
    ],
    user: users[2].userId,
  },
  {
    id: uuidv4(),
    avatar: users[2].avatar,
    userName: users[2].userName,
    content:
      "Vivamus aliquam, magna ut vestibulum pellentesque, augue mi tincidunt nisi, at sodales metus ante a lorem. Proin bibendum nulla vel mauris volutpat, eget tristique velit tincidunt. Praesent ut volutpat nisi, sit amet tincidunt ex. In dapibus arcu a lacus dignissim, in euismod arcu ultricies. Donec eu ex tellus. Aenean quis orci lacus. ",
    images: [
      "https://picsum.photos/id/1041/500/500",
      "https://picsum.photos/id/1042/500/500",
      "https://picsum.photos/id/1043/500/500",
    ],
    likes: [users[1].userId, users[4].userId],
    comments: [
      {
        content: "Wow! This is great.",
        user: users[2].userId,
        likes: [users[1].userId, users[3].userId],
      },
      {
        content: "Thank you for sharing this. Really helpful!",
        user: users[3].userId,
        likes: [users[0].userId],
        reply: [
          {
            content: "You're welcome!",
            user: users[2].userId,
            likes: [users[3].userId],
          },
        ],
      },
      {
        content: "Nice post! Keep it up.",
        user: users[0].userId,
        likes: [],
      },
      {
        content: "This is really interesting. I'll have to try this out!",
        user: users[4].userId,
        likes: [],
      },
    ],
    user: users[1].userId,
  },
];

// Mock data for commments
const comments = [
  {
    content: "Awesome!",
    user: users[0].userId,
    likes: [],
    reply: [
      {
        content: "Thanks!",
        user: users[1].userId,
        likes: [],
      },
      {
        content: "Glad you liked it!",
        user: users[2].userId,
        likes: [],
      },
    ],
    postId: posts[0].id,
    postUserId: posts[0].user,
  },
  {
    content:
      "I'm impressed by the attention to detail in this post. Keep up the good work!",
    user: users[3].userId,
    likes: [],
    reply: [],
    postId: posts[0].id,
    postUserId: posts[0].user,
  },
  {
    content: "Nice pictures! I wish I could be there.",
    user: users[1].userId,
    likes: [],
    reply: [],
    postId: posts[1].id,
    postUserId: posts[1].user,
  },
  {
    content: "Looks like an amazing place to visit!",
    user: users[4].userId,
    likes: [],
    reply: [],
    postId: posts[1].id,
    postUserId: posts[1].user,
  },
  {
    content: "I love the colors in this picture!",
    user: users[2].userId,
    likes: [],
    reply: [
      {
        content: "Me too!",
        user: users[0].userId,
        likes: [],
      },
    ],
    postId: posts[1].id,
    postUserId: posts[1].user,
  },
  {
    content:
      "This post is making me crave for some pizza! I should order some tonight :D",
    user: users[3].userId,
    likes: [],
    reply: [],
    postId: posts[2].id,
    postUserId: posts[2].user,
  },
  {
    content:
      "The place looks beautiful and the food seems delicious. Would definitely visit one day!",
    user: users[0].userId,
    likes: [],
    reply: [],
    postId: posts[2].id,
    postUserId: posts[2].user,
  },
  {
    content: "Great post, keep them coming!",
    user: users[4].userId,
    likes: [],
    reply: [
      {
        content: "Agreed!",
        user: users[2].userId,
        likes: [],
      },
    ],
    postId: posts[2].id,
    postUserId: posts[2].user,
  },
  {
    content:
      "Wow, this looks like an amazing trip! Thanks for sharing your experience with us.",
    user: users[1].userId,
    likes: [],
    reply: [
      {
        content: "I agree, it looks like a great trip!",
        user: users[2].userId,
        likes: [],
      },
      {
        content: "I wish I could have been there too!",
        user: users[3].userId,
        likes: [],
      },
    ],
    postId: posts[2].id,
    postUserId: posts[2].user,
  },
  {
    content:
      "I love the view from the top! How long did it take to get to the peak?",
    user: users[4].userId,
    likes: [],
    reply: [
      {
        content: "It took us about 3 hours to get to the top!",
        user: users[3].userId,
        likes: [],
      },
    ],
    postId: posts[2].id,
    postUserId: posts[2].user,
  },
  {
    content: "Beautiful view! 😍",
    user: users[2].userId,
    likes: [],
    reply: [
      {
        content: "Yes, it's amazing. I love this place!",
        user: users[1].userId,
        likes: [],
      },
      {
        content: "Me too! I had a great time here",
        user: users[3].userId,
        likes: [],
      },
    ],
  },
  {
    content: "Just had the best meal ever! 😋",
    user: users[1].userId,
    images: [
      "https://images.unsplash.com/photo-1556761175-597e34fb72b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ],
    likes: [users[2].userId, users[3].userId],
    comments: [
      {
        content: "Wow, that looks delicious!",
        user: users[0].userId,
        likes: [],
      },
      {
        content: "Where did you have this?",
        user: users[4].userId,
        likes: [],
      },
      {
        content: "I'm so jealous! 😩",
        user: users[2].userId,
        likes: [],
      },
    ],
  },
  {
    content: "Hello from the beach! ☀️",
    user: users[3].userId,
    images: [
      "https://images.unsplash.com/photo-1593720219068-032d2437526a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1549880348-1cd29e3e9f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1526947423211-a9877efffb6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ],
    likes: [users[1].userId, users[2].userId, users[4].userId],
    comments: [
      {
        content: "So jealous! I wish I was there too!",
        user: users[0].userId,
        likes: [],
      },
      {
        content: "Wow, it looks amazing! 😍",
        user: users[1].userId,
        likes: [],
      },
      {
        content: "I'm glad you're enjoying your vacation! 🌴",
        user: users[4].userId,
        likes: [],
      },
    ],
  },
];

// console.log(posts);
export { users, userSuggestions, posts, comments };
