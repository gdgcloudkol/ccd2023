import { PeopleData } from "../../../components/PeopleGrid/PeopleGrid";

export interface SpeakerData {
    profilePicture: string;
    fullName: string;
    tagLine: string;
}

export interface SpeakerModalData extends SpeakerData {
    bio: string;
}

export type AccomodationRequired = 'AO' | 'TO' | 'TA' | 'NO';

export interface SpeakerDataModel {
    has_spoken_previously: boolean;
    previous_talk_links: string;
    travel_support_required: AccomodationRequired;
    user?: string;
    topics_of_expertise: number[];
}

export interface SpeakerFormData {
    title: string;
    description: string;
    prevTalkLink: string;
    typeOfTalk: string;
    travelSupportRequired: string;
    prevTalked: string;
    topicOfExperties: string;
}

export interface TechTypeData {
    name: string;
    id: number;
    slug: string;
    description: string;
}

export interface MultiSelectOptionsType {
    value: number;
    label: string;
}

export interface TalkData {
    added_at?: string;
    description: string;
    event: number;
    format: string;
    id?: number;
    overview: string;
    speakers: number[];
    status?: string;
    technologies: number[];
    title: string;
}

export interface EventData {
    id: number;
    title: string;
    description: string;
    mode: string;
    technologies: number[];
    volunteers: number[];
    ts_event_code: string;
}

export interface SpeakerContentData {
    type: 'chiefguest' | 'keynote' | 'speaker',
    title: string;
    description: string;
    speakers: PeopleData[];
}