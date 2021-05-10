import * as React from "react";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import { FormStepProps } from "./FormStep";
import {
	Button,
	CircularProgress,
	Fade,
	Grid,
	Grow,
	Snackbar,
	Step,
	StepLabel,
	Stepper,
} from "@material-ui/core";
import MultiAlert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

const Alert = (props) => {
	return <MultiAlert elevation={6} variant="filled" {...props} />;
};

const GrowTransition = (props) => {
	return <Grow {...props} />;
};

const FormStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
	const router = useRouter();

	const [snackState, setSnackState] = React.useState({
		open: false,
		Transition: Fade,
	});

	const [step, setStep] = React.useState<number>(0);
	const [completed, setCompleted] = React.useState<boolean>(false);
	const childrenArray = React.Children.toArray(
		children
	) as React.ReactElement<FormStepProps>[];
	const currentChild = childrenArray[step];

	const handleSnackOpen = (Transition) => {
		setSnackState({
			open: true,
			Transition,
		});
	};

	const handleSnackClose = () => {
		setSnackState({
			...snackState,
			open: false,
		});
	};

	const isLastStep = () => {
		return step === childrenArray.length - 1;
	};

	return (
		<>
			<Formik
				{...props}
				validationSchema={currentChild?.props.validationSchema}
				onSubmit={async (values, helpers) => {
					if (isLastStep()) {
						await props.onSubmit(values, helpers);
						setCompleted(true);
						handleSnackOpen(GrowTransition);
						helpers.resetForm();
						router.push("/dashboard");
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
									{isSubmitting
										? "Submitting"
										: isLastStep()
										? "Submit"
										: "Next"}
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
			<Snackbar
				open={snackState.open}
				onClose={handleSnackClose}
				TransitionComponent={snackState.Transition}
				key={snackState.Transition.name}
			>
				<Alert onClose={handleSnackClose} severity="success">
					The form is submitted successfully
				</Alert>
			</Snackbar>
		</>
	);
};

export default FormStepper;
