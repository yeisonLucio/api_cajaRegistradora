import { CajaUseCase } from "../components/caja/aplicacion/CajaUseCase";
import { CajaRepository } from "../components/caja/dominio/CajaRepository";
import { CajaContract } from "../components/caja/dominio/contracts/CajaContract";
import { Dinero } from "../components/caja/dominio/Dinero";
import { RepositoryContract } from "../components/movimiento/dominio/contracts/RepositoryContract";
import { MongoMovimientoRepository } from "../components/movimiento/infraestructura/MongoMovimientoRepository";

const caja: jest.Mocked<CajaContract> = {
    agregarDineroBase: jest.fn(),
    obtenerCajaBase: jest.fn(),
    actualizarSaldoCaja: jest.fn(),
    obtenerSaldoCaja: jest.fn()
}

const movimiento: jest.Mocked<RepositoryContract> = {
    nuevoMovimiento: jest.fn(),
    obtenerMovimientosPorFecha: jest.fn(),
    obtenerMovimientos: jest.fn()
}


describe("Casos de uso de caja", () => {
    test("agregarDineroBase", async()=>{
        movimiento.nuevoMovimiento.mockImplementation((movimiento) => {
            return new Promise((resolve) => {
                resolve(movimiento);
            })
        })
        caja.agregarDineroBase.mockImplementation((dinero) => {
            return new Promise((resolve, reject) => {
                resolve([dinero])
            })
        })

        const movimientoRepo = new MongoMovimientoRepository();
        const dinero = new Dinero(10, 20000,"billete");
        const cajaRepo = new CajaRepository();
        const cajaUseCase = new CajaUseCase(cajaRepo);
        const baseCaja = await cajaUseCase.agregarDineroBaseCaja(10, 20000);
        expect(baseCaja).toContainEqual(dinero);

    })
})