import { ApolloClient, InMemoryCache, gql, makeVar } from "@apollo/client";

// Apollo Client의 로컬 상태 변수
const moviesVar = makeVar([]);

// JSON 데이터를 불러와서 상태로 저장하는 함수
const loadMovies = async () => {
  try {
    const response = await fetch("/movies.json"); // 경로 수정
    if (!response.ok) {
      throw new Error("Failed to load movies data");
    }
    const data = await response.json();
    moviesVar(data.allMovies); // JSON 데이터를 Apollo 상태 변수에 저장
  } catch (error) {
    console.error("Error loading movies:", error);
  }
};

// Apollo Client 타입 정의
const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    medium_cover_image: String!
    rating: Float
    isLiked: Boolean
  }

  type Query {
    allMovies: [Movie]!
  }
`;

// Apollo Client 인스턴스 생성
const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      allMovies: () => moviesVar(), // Apollo가 상태 변수를 가져오도록 설정
    },
  },
});

// JSON 데이터 로드 후 Apollo 상태 업데이트
loadMovies();

export default client;

//////
// import { ApolloClient, InMemoryCache, gql, makeVar } from "@apollo/client";

// // JSON 데이터를 불러와서 상태로 저장
// const loadMovies = async () => {
//   try {
//     const response = await fetch("/");
//     if (!response.ok) {
//       throw new Error("Failed to load movies data");
//     }
//     const data = await response.json();
//     moviesVar(data.allMovies);
//   } catch (error) {
//     console.error("Error loading movies:", error);
//   }
// };

// // Apollo Client의 로컬 상태 변수
// const moviesVar = makeVar([]);

// // 즉시 JSON 데이터 로드
// loadMovies();

// // GraphQL 타입 정의
// const typeDefs = gql`
//   type Movie {
//     id: ID!
//     title: String!
//     medium_cover_image: String!
//   }

//   type Query {
//     allMovies: [Movie]!
//   }
// `;

// // Apollo Client 인스턴스 생성
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   typeDefs,
//   resolvers: {
//     Query: {
//       allMovies: () => moviesVar(),
//     },
//   },
// });

// export default client;

//////////////////
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });

// export default client;
