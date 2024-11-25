import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS } from '~shared/keys';

class HttpService {
	constructor(
		private baseUrl = import.meta.env.VITE_BASE_URL,
		private fetchingService = axios,
		private apiVersion = 'api',
	) {}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private getAuthToken(): string | null {
		const storedData = localStorage.getItem(STORAGE_KEYS.TOKEN);
		if (storedData) {
			try {
				const parsedData = JSON.parse(storedData);
				return parsedData.state.token || null;
			} catch (error) {
				console.error('Error parsing token data:', error);
				return null;
			}
		}
		return null;
	}

	private populateTokenToHeaderConfig(): { Authorization: string } {
		const token = this.getAuthToken();
		return {
			Authorization: token ? `Bearer ${token}` : '',
		};
	}

	async get(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.get(this.getFullApiUrl(config.url), config);
	}

	async post(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.post(
			this.getFullApiUrl(config.url),
			config.data,
			config,
		);
	}

	async put(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.put(
			this.getFullApiUrl(config.url),
			config.data,
			config,
		);
	}

	async delete(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.delete(
			this.getFullApiUrl(config.url),
			config,
		);
	}
}

export default HttpService;
