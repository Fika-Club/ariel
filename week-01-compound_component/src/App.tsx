import { Stepper } from './stepper';

const App = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Stepper>
                <Stepper.Question value={1}>
                    <span>가을이는 고양이다.</span>
                </Stepper.Question>
                <Stepper.Question value={2}>
                    <span>가을이 코는 까만색이다.</span>
                </Stepper.Question>
                <Stepper.Question value={3}>
                    <span>가을이는 귀엽다.</span>
                </Stepper.Question>
                <Stepper.Answer />
                <div className="flex flex-col items-center gap-4">
                    <Stepper.Result />
                    <Stepper.Navigation />
                </div>
            </Stepper>
        </div>
    );
};

export default App;
