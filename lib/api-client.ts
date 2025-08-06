import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id" | "createdAt" | "updatedAt">

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: any;
};

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}

    ): Promise<T> {
        const {method = "GET", headers = {}, body} = options;
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const res = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        if(!res.ok) throw new Error(await res.text()); 



        return res.json();

    }

    async getVideos() {
        return this.fetch("/video")
    }

    async createVideo(video: VideoFormData) {
        return this.fetch("/video", {
            method: "POST",
            body: video
        })
    }

}

export const ApiClient = new ApiClient()