import { InjectionToken, Type } from '@angular/core';
import { IJsonDeserializer } from './json-deserializer.interface';

export const JSON_ADAPTER_STORE = new InjectionToken('JSON_ADAPTER_STORE');

export const globalInstanceStore: Map<Type<any>, Type<IJsonDeserializer<any>>> = new Map();
