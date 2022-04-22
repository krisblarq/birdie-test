import "./App.css";
import tw from "twin.macro";
import ObservationInfo from "./components/ObservationInfo";

const AppContainer = tw.div`
  w-full
  max-w-full
  flex
  flex-col
  items-center
  justify-center
  pt-6
  pb-10
  pl-10
  pr-10
`;

const Title = tw.h1`
  text-2xl
  font-semibold
`;

function App() {
  return (
    <AppContainer>
      <Title>React Tables</Title>
      <ObservationInfo />
    </AppContainer>
  );
}

export default App;
