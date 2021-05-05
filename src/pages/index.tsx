import { Box, Card, CardContent, makeStyles } from "@material-ui/core";
import { Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import * as yup from "yup";
import FormStep from "../components/FormStep";
import FormStepper from "../components/FormStepper";

const useStyles = makeStyles({
	root: {
		marginTop: 100,
	},
});

const sleep = (time) => {
	return new Promise((acc) => setTimeout(acc, time));
};

export default function Home() {
	const classes = useStyles();

	return (
		<Card>
			<CardContent>
				<FormStepper
					initialValues={{
						firstName: "",
						lastName: "",
						millionaire: false,
						money: 0,
						description: "",
					}}
					onSubmit={async (values) => {
						await sleep(3000);
						console.log("values", values);
					}}
				>
					<FormStep
						label="Personal Data"
						// validationSchema={yup.object({
						// 	firstname: yup.string().required(),
						// 	lastname: yup.string().required(),
						// 	millionaire: yup.bool(),
						// })}
					>
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name="firstName"
								component={TextField}
								label="First Name"
							/>
						</Box>
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name="lastName"
								component={TextField}
								label="Last Name"
							/>
						</Box>
						<Box paddingBottom={2}>
							<Field
								name="millionaire"
								type="checkbox"
								component={CheckboxWithLabel}
								Label={{ label: "If you are millionaire" }}
							/>
						</Box>
					</FormStep>
					<FormStep
						label="Bank Accounts"
						validationSchema={yup.object({
							money: yup.mixed().when("millionaire", {
								is: true,
								then: yup
									.number()
									.required()
									.min(
										1_000_000,
										"Because you siad you are a millionaire you need to have at least $ 1 million!"
									),
								otherwise: yup.number().required().min(1),
							}),
						})}
					>
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name="money"
								type="number"
								component={TextField}
								label="All the money in the pack"
							/>
						</Box>
					</FormStep>
					<FormStep label="More Info">
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name="description"
								component={TextField}
								label="Description"
							/>
						</Box>
					</FormStep>
				</FormStepper>
			</CardContent>
		</Card>
	);
}
