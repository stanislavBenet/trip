import Main from "./Main";
import ModalWindow from "./ModalWindow";
import Weather from "./store/Weather";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  return (
    <>
      <Main />
      {Weather.modalWindow && <ModalWindow />}
    </>
  );
});

export default App;
