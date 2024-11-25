import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@blueprintjs/core';
import {
	buttonContainerStyle,
	formContainerStyle,
	inputsStyle,
} from '~shared/components/TodoForm/TodoForm.styles';
import { CreateTodo, TodoFormValues } from '~shared/services/types';
import { DEFAULT_FORM_VALUES } from '~utils/constants';
import { joiResolver } from '@hookform/resolvers/joi';
import { todoSchema } from '~utils/validation';
import Input from '~shared/components/input/input.component';
import Switch from '~shared/components/switch/switch.component';

interface TodoFormProps {
	initialValues?: TodoFormValues;
	onSubmit: (data: TodoFormValues | CreateTodo) => void;
	onCancel: () => void;
	buttonText: string;
	hideCompleteSwitch?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
	initialValues,
	onSubmit,
	onCancel,
	buttonText,
	hideCompleteSwitch = false,
}) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TodoFormValues>({
		defaultValues: initialValues || DEFAULT_FORM_VALUES,
		resolver: joiResolver(todoSchema),
		shouldFocusError: false,
	});

	React.useEffect(() => {
		reset(initialValues);
	}, [initialValues, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={formContainerStyle}>
			<div className={inputsStyle}>
				<Input
					name="title"
					control={control}
					placeholder="Title"
					errors={errors}
				/>

				<Input
					name="description"
					control={control}
					placeholder="Description"
					errors={errors}
				/>
			</div>

			<Switch
				name="isPrivate"
				control={control}
				label="Private"
				errors={errors}
			/>

			{!hideCompleteSwitch && (
				<Switch
					name="isComplete"
					control={control}
					label="Complete"
					errors={errors}
				/>
			)}

			<div className={buttonContainerStyle}>
				<Button text="Cancel" onClick={onCancel} />
				<Button text={buttonText} intent="primary" type="submit" />
			</div>
		</form>
	);
};

export default TodoForm;
