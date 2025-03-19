import { ApolloClient, InMemoryCache, gql, makeVar } from "@apollo/client";

// Apollo Client의 로컬 상태 변수
export const moviesVar = makeVar([]);

// JSON 데이터를 불러와서 상태로 저장하는 함수
const loadMovies = async () => {
  try {
    const response = await fetch("/movies.json"); // public/movies.json 경로
    if (!response.ok) {
      throw new Error("Failed to load movies data");
    }
    const data = await response.json();
    moviesVar(data.allMovies || []); // JSON 데이터의 allMovies를 상태 변수에 저장
  } catch (error) {
    console.error("Error loading movies:", error);
    moviesVar([]); // 에러 발생 시 빈 배열로 초기화
  }
};

// GraphQL 타입 정의
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
    movie(id: ID!): Movie
  }
`;

// Apollo Client 인스턴스 생성
const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      // allMovies 쿼리: moviesVar에서 전체 영화 목록 반환
      allMovies: () => moviesVar(),
      // movie 쿼리: moviesVar에서 ID로 특정 영화 필터링
      movie: (_, { id }) => {
        const movies = moviesVar();
        return movies.find((movie) => movie.id === id) || null;
      },
    },
  },
});

// JSON 데이터 로드
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
