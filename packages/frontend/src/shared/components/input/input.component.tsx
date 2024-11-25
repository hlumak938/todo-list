import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputGroup } from '@blueprintjs/core';
import { BaseFormValues } from '~shared/services/types';
import { errorText } from '~shared/styles';

interface InputProps {
	name: keyof BaseFormValues;
	control: Control<BaseFormValues>;
	placeholder: string;
	errors: Record<string, any>;
}

const Input: React.FC<InputProps> = ({
	name,
	control,
	placeholder,
	errors,
}) => {
	return (
		<>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<InputGroup
						{...field}
						placeholder={placeholder}
						intent={errors[name] ? 'danger' : 'none'}
						large
						value={
							typeof field.value === 'boolean' ? '' : field.value
						}
					/>
				)}
			/>
			{errors[name] && (
				<p className={errorText}>{errors[name].message}</p>
			)}
		</>
	);
};

export default Input;
