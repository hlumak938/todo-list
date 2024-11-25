import React from 'react';
import {
	Controller,
	DefaultValues,
	FieldValues,
	Path,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import { Button, Card, InputGroup } from '@blueprintjs/core';
import {
	buttonStyle,
	cardStyle,
	extraContentStyle,
	formContainerStyle,
	formGroupStyle,
	formStyle,
	inputGroupStyle,
} from '~shared/components/UserForm/UserForm.styles';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { errorText } from '~shared/styles';

type FormField = {
	name: string;
	type: string;
	placeholder: string;
};

type UserFormProps<T extends FieldValues> = {
	title: string;
	fields: FormField[];
	onSubmit: SubmitHandler<T>;
	submitText: string;
	extraContent?: React.ReactNode;
	defaultValues?: DefaultValues<T>;
	schema: Joi.Schema;
};

const UserForm = <T extends FieldValues>({
	title,
	fields,
	onSubmit,
	submitText,
	extraContent,
	defaultValues,
	schema,
}: UserFormProps<T>): React.ReactElement => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<T>({
		defaultValues,
		shouldFocusError: false,
		resolver: joiResolver(schema),
	});
	return (
		<div className={formStyle}>
			<Card className={cardStyle}>
				<h2>{title}</h2>
				<form
					className={formContainerStyle}
					onSubmit={handleSubmit(onSubmit)}
				>
					{fields.map((field) => (
						<div key={field.name} className={formGroupStyle}>
							<Controller
								name={field.name as Path<T>}
								control={control}
								render={({ field: inputField }) => (
									<InputGroup
										{...inputField}
										placeholder={field.placeholder}
										type={field.type}
										className={inputGroupStyle}
									/>
								)}
							/>
							{errors[field.name] && (
								<p className={errorText}>
									{errors[field.name]?.message as string}
								</p>
							)}
						</div>
					))}

					<Button
						type="submit"
						intent="primary"
						large
						className={buttonStyle}
					>
						{submitText}
					</Button>
				</form>
				{extraContent && (
					<div className={extraContentStyle}>{extraContent}</div>
				)}
			</Card>
		</div>
	);
};

export default UserForm;
