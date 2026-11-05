import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';

vi.mock('../hooks/useTaquerias', () => ({ default: vi.fn() }));

import useTaquerias from '../hooks/useTaquerias';
import Taquerias from './Taquerias';

const crearTaquerias = (cantidad) =>
  Array.from({ length: cantidad }, (_, i) => ({
    id: `t-${i + 1}`,
    nombre: `Taquería ${i + 1}`,
    descripcion: '',
    etiquetas: i % 2 === 0 ? ['Pastor', 'Suadero'] : [],
    facebook: null,
    instagram: null,
    maps: null,
    foto: null,
  }));

const cargarCon = (items) => {
  useTaquerias.mockReturnValue({ status: 'ok', items, reintentar: vi.fn() });
  return render(<Taquerias />);
};

const botonListado = () => screen.getByRole('button', { name: 'Ver listado completo' });
const diálogo = () => document.getElementById('taquerias-listado');

describe('Listado completo de taquerías', () => {
  beforeEach(() => {
    useTaquerias.mockReset();
  });

  it('muestra el botón "Ver listado completo" cuando hay más de 3 taquerías', () => {
    cargarCon(crearTaquerias(6));
    expect(botonListado()).toBeTruthy();
    expect(screen.queryByRole('button', { name: /ver todas/i })).toBeNull();
  });

  it('no muestra el botón ni el listado cuando hay 3 o menos taquerías', () => {
    cargarCon(crearTaquerias(3));
    expect(screen.queryByRole('button', { name: 'Ver listado completo' })).toBeNull();
    expect(diálogo()).toBeNull();
  });

  it('el diálogo arranca cerrado', () => {
    cargarCon(crearTaquerias(6));
    expect(diálogo().open).toBe(false);
  });

  it('al pulsar el botón abre el diálogo con el título', () => {
    cargarCon(crearTaquerias(6));
    fireEvent.click(botonListado());

    expect(diálogo().open).toBe(true);
    expect(screen.getByRole('heading', { name: 'Taquerías participantes' })).toBeTruthy();
  });

  it('lista todas las taquerías, numeradas en orden', () => {
    cargarCon(crearTaquerias(6));
    fireEvent.click(botonListado());

    const items = within(diálogo()).getAllByRole('listitem');
    expect(items).toHaveLength(6);

    items.forEach((li, i) => {
      expect(li.querySelector('.listado-dialog__num').textContent).toBe(`0${i + 1}`);
      expect(li.querySelector('.listado-dialog__name').textContent).toBe(`Taquería ${i + 1}`);
    });
  });

  it('muestra las etiquetas separadas por " · " y omite las vacías', () => {
    cargarCon(crearTaquerias(6));
    fireEvent.click(botonListado());

    const items = within(diálogo()).getAllByRole('listitem');
    expect(items[0].querySelector('.listado-dialog__tags').textContent).toBe('Pastor · Suadero');
    expect(items[1].querySelector('.listado-dialog__tags')).toBeNull();
  });

  it('el botón "Cerrar" cierra el diálogo', () => {
    cargarCon(crearTaquerias(6));
    fireEvent.click(botonListado());

    fireEvent.click(within(diálogo()).getByRole('button', { name: 'Cerrar' }));
    expect(diálogo().open).toBe(false);
  });

  it('un clic en el fondo cierra el diálogo, pero un clic dentro del contenido no', () => {
    cargarCon(crearTaquerias(6));
    fireEvent.click(botonListado());

    fireEvent.click(within(diálogo()).getByRole('heading', { name: 'Taquerías participantes' }));
    expect(diálogo().open).toBe(true);

    fireEvent.click(diálogo());
    expect(diálogo().open).toBe(false);
  });

  it('se puede volver a abrir después de cerrar', () => {
    cargarCon(crearTaquerias(6));
    fireEvent.click(botonListado());
    fireEvent.click(within(diálogo()).getByRole('button', { name: 'Cerrar' }));

    fireEvent.click(botonListado());
    expect(diálogo().open).toBe(true);
  });

  it('el listado incluye taquerías que llegan después del primer render (cambio de items)', () => {
    const { rerender } = cargarCon(crearTaquerias(4));
    useTaquerias.mockReturnValue({ status: 'ok', items: crearTaquerias(8), reintentar: vi.fn() });
    rerender(<Taquerias />);

    fireEvent.click(botonListado());
    expect(within(diálogo()).getAllByRole('listitem')).toHaveLength(8);
  });
});
