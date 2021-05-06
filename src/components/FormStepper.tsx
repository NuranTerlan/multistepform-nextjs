import * as React from "react";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import { FormStepProps } from "./FormStep";
import {
	Button,
	CircularProgress,
	Grid,
	Step,
	StepLabel,
	Stepper,
} from "@material-ui/core";

const FormStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
	const [step, setStep] = React.useState<number>(0);
	const [completed, setCompleted] = React.useState<boolean>(false);
	const childrenArray = React.Children.toArray(
		children
	) as React.ReactElement<FormStepProps>[];
	const currentChild = childrenArray[step];

	const isLastStep = () => {
		return step === childrenArray.length - 1;
	};

	return (
		<Formik
			{...props}
			validationSchema={currentChild?.props.validationSchema}
			onSubmit={async (values, helpers) => {
				if (isLastStep()) {
					await props.onSubmit(values, helpers);
					setCompleted(true);
					helpers.resetForm();
				} else {
					console.log("next clicked");
					setStep((prevState) => prevState + 1);
					// helpers.setTouched({});
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<Stepper alternativeLabel activeStep={step}>
						{childrenArray.map((child, index) => (
							<Step
								key={child?.props.label}
								completed={step > index || completed}
							>
								<StepLabel>{child?.props.label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{currentChild && currentChild}
					<Grid container spacing={2}>
						{step > 0 ? (
							<Grid item>
								<Button
									disabled={isSubmitting}
									variant="contained"
									color="primary"
									onClick={() => setStep((prevState) => prevState - 1)}
								>
									Back
								</Button>
							</Grid>
						) : null}
						<Grid item>
							<Button
								startIcon={
									isSubmitting ? <CircularProgress size="1rem" /> : null
								}
								disabled={isSubmitting}
								variant="contained"
								color="primary"
								type="submit"
							>
								{isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
							</Button>
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default FormStepper;
