import * as R from 'ramda';
import {
  ABSTRACT_STIX_CYBER_OBSERVABLE,
  ABSTRACT_STIX_CYBER_OBSERVABLE_HASHED_OBSERVABLE,
  buildRefRelationKey,
} from './general';
import {
  RELATION_CREATED_BY,
  RELATION_EXTERNAL_REFERENCE,
  RELATION_OBJECT,
  RELATION_OBJECT_LABEL,
  RELATION_OBJECT_MARKING,
} from './stixMetaRelationship';
import { RELATION_RELATED_TO } from './stixCoreRelationship';
import { STIX_SIGHTING_RELATIONSHIP } from './stixSightingRelationship';
import {
  AttributeDefinition,
  createdAt,
  entityType,
  internalId,
  specVersion,
  standardId,
  updatedAt,
  xOpenctiStixIds
} from './attribute-definition';
import { schemaAttributesDefinition } from './schema-attributes';

export const ENTITY_AUTONOMOUS_SYSTEM = 'Autonomous-System';
export const ENTITY_DIRECTORY = 'Directory';
export const ENTITY_DOMAIN_NAME = 'Domain-Name';
export const ENTITY_EMAIL_ADDR = 'Email-Addr';
export const ENTITY_EMAIL_MESSAGE = 'Email-Message';
export const ENTITY_EMAIL_MIME_PART_TYPE = 'Email-Mime-Part-Type';
export const ENTITY_HASHED_OBSERVABLE_ARTIFACT = 'Artifact';
export const ENTITY_HASHED_OBSERVABLE_STIX_FILE = 'StixFile'; // Because File already used
export const ENTITY_HASHED_OBSERVABLE_X509_CERTIFICATE = 'X509-Certificate';
export const ENTITY_IPV4_ADDR = 'IPv4-Addr';
export const ENTITY_IPV6_ADDR = 'IPv6-Addr';
export const ENTITY_MAC_ADDR = 'Mac-Addr';
export const ENTITY_MUTEX = 'Mutex';
export const ENTITY_NETWORK_TRAFFIC = 'Network-Traffic';
export const ENTITY_PROCESS = 'Process';
export const ENTITY_SOFTWARE = 'Software';
export const ENTITY_URL = 'Url';
export const ENTITY_USER_ACCOUNT = 'User-Account';
export const ENTITY_WINDOWS_REGISTRY_KEY = 'Windows-Registry-Key';
export const ENTITY_WINDOWS_REGISTRY_VALUE_TYPE = 'Windows-Registry-Value-Type';
export const ENTITY_CRYPTOGRAPHIC_KEY = 'Cryptographic-Key'; // Custom
export const ENTITY_CRYPTOGRAPHIC_WALLET = 'Cryptocurrency-Wallet'; // Custom
export const ENTITY_HOSTNAME = 'Hostname'; // Custom
export const ENTITY_TEXT = 'Text'; // Custom
export const ENTITY_USER_AGENT = 'User-Agent'; // Custom
export const ENTITY_BANK_ACCOUNT = 'Bank-Account'; // Custom
export const ENTITY_PHONE_NUMBER = 'Phone-Number'; // Custom
export const ENTITY_PAYMENT_CARD = 'Payment-Card'; // Custom
export const ENTITY_MEDIA_CONTENT = 'Media-Content'; // Custom

const STIX_CYBER_OBSERVABLES_HASHED_OBSERVABLES = [
  ENTITY_HASHED_OBSERVABLE_ARTIFACT,
  ENTITY_HASHED_OBSERVABLE_STIX_FILE,
  ENTITY_HASHED_OBSERVABLE_X509_CERTIFICATE,
];
schemaAttributesDefinition.register(ABSTRACT_STIX_CYBER_OBSERVABLE_HASHED_OBSERVABLE, STIX_CYBER_OBSERVABLES_HASHED_OBSERVABLES);
const STIX_CYBER_OBSERVABLES = [
  ENTITY_AUTONOMOUS_SYSTEM,
  ENTITY_DIRECTORY,
  ENTITY_DOMAIN_NAME,
  ENTITY_EMAIL_ADDR,
  ENTITY_EMAIL_MESSAGE,
  ENTITY_EMAIL_MIME_PART_TYPE,
  ENTITY_HASHED_OBSERVABLE_ARTIFACT,
  ENTITY_HASHED_OBSERVABLE_STIX_FILE,
  ENTITY_HASHED_OBSERVABLE_X509_CERTIFICATE,
  ENTITY_IPV4_ADDR,
  ENTITY_IPV6_ADDR,
  ENTITY_MAC_ADDR,
  ENTITY_MUTEX,
  ENTITY_NETWORK_TRAFFIC,
  ENTITY_PROCESS,
  ENTITY_SOFTWARE,
  ENTITY_URL,
  ENTITY_USER_ACCOUNT,
  ENTITY_WINDOWS_REGISTRY_KEY,
  ENTITY_WINDOWS_REGISTRY_VALUE_TYPE,
  ENTITY_CRYPTOGRAPHIC_KEY,
  ENTITY_CRYPTOGRAPHIC_WALLET,
  ENTITY_HOSTNAME,
  ENTITY_USER_AGENT,
  ENTITY_TEXT,
  ENTITY_BANK_ACCOUNT,
  ENTITY_PHONE_NUMBER,
  ENTITY_PAYMENT_CARD,
  ENTITY_MEDIA_CONTENT,
];
schemaAttributesDefinition.register(ABSTRACT_STIX_CYBER_OBSERVABLE, STIX_CYBER_OBSERVABLES);

export const isStixCyberObservableHashedObservable = (type: string) => schemaAttributesDefinition.get(ABSTRACT_STIX_CYBER_OBSERVABLE_HASHED_OBSERVABLE).includes(type)
  || type === ABSTRACT_STIX_CYBER_OBSERVABLE_HASHED_OBSERVABLE;
export const isStixCyberObservable = (type: string) => schemaAttributesDefinition.get(ABSTRACT_STIX_CYBER_OBSERVABLE).includes(type)
  || type === ABSTRACT_STIX_CYBER_OBSERVABLE;

export const stixCyberObservableOptions = {
  StixCyberObservablesFilter: {
    createdBy: buildRefRelationKey(RELATION_CREATED_BY),
    markedBy: buildRefRelationKey(RELATION_OBJECT_MARKING),
    labelledBy: buildRefRelationKey(RELATION_OBJECT_LABEL),
    relatedTo: buildRefRelationKey(RELATION_RELATED_TO),
    objectContained: buildRefRelationKey(RELATION_OBJECT),
    containedBy: buildRefRelationKey(RELATION_OBJECT), // ASK SAM
    hasExternalReference: buildRefRelationKey(RELATION_EXTERNAL_REFERENCE),
    sightedBy: buildRefRelationKey(STIX_SIGHTING_RELATIONSHIP),
    hashes_MD5: 'hashes.MD5',
    hashes_SHA1: 'hashes.SHA-1',
    hashes_SHA256: 'hashes.SHA-256',
    creator: 'creator_id',
  },
  StixCyberObservablesOrdering: {}
};

const stixCyberObservablesAttributes: { [k: string]: Array<AttributeDefinition> } = {
  [ENTITY_AUTONOMOUS_SYSTEM]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'number', type: 'string', mandatoryType: 'external', multiple: false, upsert: true },
    { name: 'name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'rir', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_DIRECTORY]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'path', type: 'string', mandatoryType: 'external', multiple: false, upsert: true },
    { name: 'path_enc', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'ctime', type: 'date', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'mtime', type: 'date', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'atime', type: 'date', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_DOMAIN_NAME]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_EMAIL_ADDR]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'external', multiple: false, upsert: true },
    { name: 'display_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_EMAIL_MESSAGE]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'is_multipart', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'attribute_date', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'content_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'message_id', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'received_lines', type: 'string', mandatoryType: 'no', multiple: true, upsert: true },
    { name: 'body', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_EMAIL_MIME_PART_TYPE]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'body', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'content_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'content_disposition', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_HASHED_OBSERVABLE_ARTIFACT]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'mime_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'hashes', type: 'dictionary', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'payload_bin', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'url', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'encryption_algorithm', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'decryption_key', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_additional_names', type: 'string', mandatoryType: 'no', multiple: true, upsert: true },
  ],
  [ENTITY_HASHED_OBSERVABLE_STIX_FILE]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'hashes', type: 'dictionary', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'extensions', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'size', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'name_enc', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'magic_number_hex', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'ctime', type: 'date', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'mtime', type: 'date', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'atime', type: 'date', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_additional_names', type: 'string', mandatoryType: 'no', multiple: true, upsert: true },
    { name: 'obsContent', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    // Missing mime-type
  ],
  [ENTITY_HASHED_OBSERVABLE_X509_CERTIFICATE]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'hashes', type: 'dictionary', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'is_self_signed', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'version', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'serial_number', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'signature_algorithm', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'issuer', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'validity_not_before', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'validity_not_after', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject_public_key_algorithm', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject_public_key_modulus', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject_public_key_exponent', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'basic_constraints', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'name_constraints', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'policy_constraints', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'key_usage', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'extended_key_usage', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject_key_identifier', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'authority_key_identifier', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject_alternative_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'issuer_alternative_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'subject_directory_attributes', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'crl_distribution_points', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'inhibit_any_policy', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'private_key_usage_period_not_before', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'private_key_usage_period_not_after', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'certificate_policies', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'policy_mappings', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_IPV4_ADDR]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_IPV6_ADDR]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_MAC_ADDR]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_MUTEX]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_NETWORK_TRAFFIC]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'extensions', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'start', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'end', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'is_active', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'src_port', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'dst_port', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'protocols', type: 'string', mandatoryType: 'no', multiple: true, upsert: true },
    { name: 'src_byte_count', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'dst_byte_count', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'src_packets', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'dst_packets', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_PROCESS]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'extensions', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'is_hidden', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'pid', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'created_time', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'cwd', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'command_line', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'environment_variables', type: 'string', mandatoryType: 'no', multiple: true, upsert: true },
    // windows-process-ext
    { name: 'aslr_enabled', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'dep_enabled', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'priority', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'owner_sid', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'window_title', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'startup_info', type: 'dictionary', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'integrity_level', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    // windows-service-ext
    { name: 'service_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'descriptions', type: 'string', mandatoryType: 'no', multiple: true, upsert: false },
    { name: 'display_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'group_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'start_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'service_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'service_status', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    // Missing serviceDlls
  ],
  [ENTITY_SOFTWARE]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'cpe', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'swid', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'languages', type: 'string', mandatoryType: 'no', multiple: true, upsert: true },
    { name: 'vendor', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'version', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_URL]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_USER_ACCOUNT]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'extensions', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'user_id', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'credential', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'account_login', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'account_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'display_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'is_service_account', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'is_privileged', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'can_escalate_privs', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'is_disabled', type: 'boolean', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'account_created', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'account_expires', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'credential_last_changed', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'account_first_login', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'account_last_login', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_WINDOWS_REGISTRY_KEY]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'attribute_key', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'modified_time', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'number_of_subkeys', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_WINDOWS_REGISTRY_VALUE_TYPE]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'data', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'data_type', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_CRYPTOGRAPHIC_KEY]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_CRYPTOGRAPHIC_WALLET]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_HOSTNAME]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_TEXT]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_USER_AGENT]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_BANK_ACCOUNT]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'iban', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'bic', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'account_number', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_PHONE_NUMBER]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'value', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_PAYMENT_CARD]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'card_number', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'expiration_date', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'cvv', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
    { name: 'holder_name', type: 'string', mandatoryType: 'no', multiple: false, upsert: true },
  ],
  [ENTITY_MEDIA_CONTENT]: [
    internalId,
    standardId,
    entityType,
    xOpenctiStixIds,
    specVersion,
    createdAt,
    updatedAt,
    { name: 'i_created_at_day', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_month', type: 'date', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'i_created_at_year', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'title', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'content', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'media_category', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
    { name: 'url', type: 'string', mandatoryType: 'external', multiple: false, upsert: false },
    { name: 'publication_date', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
  ],
};
R.forEachObjIndexed((value, key) => schemaAttributesDefinition.registerAttributes(key as string, value), stixCyberObservablesAttributes);