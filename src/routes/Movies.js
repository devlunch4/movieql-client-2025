import styled from "styled-components";
import {
  //gql,
  useQuery,
} from "@apollo/client";
import { Link } from "react-router-dom";
// add
import { useEffect, useState } from "react";

// hide
// const ALL_MOVIES = gql`
//   query getMovies {
//     allMovies {
//       id
//       title
//       medium_cover_image
//     }
//   }
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const PosterContainer = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const PosterBg = styled.div`
  background-image: url(${(props) => props.background});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movies() {
  // add
  const [data, setData] = useState(null); // 영화 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  // JSON 데이터를 가져오는 함수
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/movies.json"); // public/movies.json
        if (!response.ok) {
          throw new Error("Failed to load movies");
        }
        const jsonData = await response.json();
        setData(jsonData); // 데이터 설정
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false); // 에러 발생 시 로딩 종료
      }
    };
    fetchMovies();
  }, []); // 컴포넌트 마운트 시 한 번만 실행
  console.log("Loading:", loading, "Data:", data); // 디버깅용

  ///////
 // const { data, loading } = useQuery(ALL_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo Movies</Title>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <MoviesGrid>
        {data?.allMovies?.map((movie) => (
          <PosterContainer key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <PosterBg background={movie.medium_cover_image} />
            </Link>
          </PosterContainer>
        ))}
      </MoviesGrid>
    </Container>
  );
}

////////////
////
// import styled from "styled-components";
// import { gql, useQuery } from "@apollo/client";
// import { Link } from "react-router-dom";

// const ALL_MOVIES = gql`
//   query getMovies {
//     allMovies {
//       id
//       title
//       medium_cover_image
//     }
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
// `;

// const Header = styled.header`
//   background-image: linear-gradient(-45deg, #d754ab, #fd723a);
//   height: 45vh;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// `;

// const Title = styled.h1`
//   font-size: 60px;
//   font-weight: 600;
//   margin-bottom: 20px;
// `;

// const Loading = styled.div`
//   font-size: 18px;
//   opacity: 0.5;
//   font-weight: 500;
//   margin-top: 10px;
// `;

// const MoviesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-gap: 25px;
//   width: 60%;
//   position: relative;
//   top: -50px;
// `;

// const PosterContainer = styled.div`
//   height: 400px;
//   border-radius: 7px;
//   width: 100%;
//   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//   background-color: transparent;
// `;

// const PosterBg = styled.div`
//   background-image: url(${(props) => props.background});
//   height: 100%;
//   width: 100%;
//   background-size: cover;
//   background-position: center center;
//   border-radius: 7px;
// `;

// export default function Movies() {
//   const { data, loading } = useQuery(ALL_MOVIES);
//   return (
//     <Container>
//       <Header>
//         <Title>Apollo Movies</Title>
//       </Header>
//       {loading && <Loading>Loading...</Loading>}
//       <MoviesGrid>
//         {data?.allMovies?.map((movie) => (
//           <PosterContainer key={movie.id}>
//             <Link to={`/movies/${movie.id}`}>
//               <PosterBg background={movie.medium_cover_image} />
//             </Link>
//           </PosterContainer>
//         ))}
//       </MoviesGrid>
//     </Container>
//   );
// }
