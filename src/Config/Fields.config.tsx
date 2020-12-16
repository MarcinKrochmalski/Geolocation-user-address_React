import * as Yup from "yup";
import { FiledsModel } from '../Models/Fields.model';

export const FieldsConfig = (): FiledsModel[] => (
    [
        {
            name: 'woj',
            type: 'select',
            text: 'Województwo',
            value: 'mazowieckie',
            helper: 'Wybierz województwo , lub wskaż na mapie',
            validate: Yup.string().required(),
            options: {
                'dolnośląskie': 'dolnośląskie',
                'kujawsko-pomorskie': 'kujawsko-pomorskie',
                'lubelskie': 'lubelskie',
                'lubuskie': 'lubuskie',
                'łódzkie': 'łódzkie',
                'małopolskie': 'małopolskie',
                'mazowieckie': 'mazowieckie',
                'opolskie': 'opolskie',
                'podkarpackie': 'podkarpackie',
                'podlaskie': 'podlaskie',
                'pomorskie': 'pomorskie',
                'śląskie': 'śląskie',
                'świętokrzyskie': 'świętokrzyskie',
                'warmińsko-mazurskie': 'warmińsko-mazurskie',
                'wielkopolskie': 'wielkopolskie',
                'zachodniopomorskie': 'zachodniopomorskie'
            }
        },
        {
            name: 'pow',
            type: 'text',
            text: 'Powiat',
            value: '',
            helper: '',
            validate: Yup.string().min(2).max(60).required()
        },
        {
            name: 'gmi',
            type: 'text',
            text: 'Gmina',
            value: '',
            helper: '',
            validate: Yup.string().min(2).max(60).required()
        },
        {
            name: 'msc',
            type: 'text',
            text: 'Miejscowość',
            value: '',
            helper: '',
            validate: Yup.string().min(2).max(60).required()
        },
        {
            name: 'kod',
            type: 'text',
            text: 'Kod pocztowy',
            value: '',
            helper: '(format: 00-000)',
            validate: Yup.string().min(6).max(6).matches(/\d{2}-\d{3}/g, '').required(),
        },
        {
            name: 'ulc',
            type: 'text',
            text: 'Ulica',
            value: '',
            helper: '',
            validate: Yup.string().max(60)
        },
        {
            name: 'nr',
            type: 'text',
            text: 'Numer domu',
            value: '',
            helper: '',
            validate: Yup.string().min(1).max(60).required()
        },
        {
            name: 'mie',
            type: 'text',
            text: 'Numer mieszkania',
            value: '',
            helper: '',
            validate: Yup.string().min(1).max(60)

        }
    ]
)