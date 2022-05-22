import { getCustomRepository } from "typeorm";
import { NumeroProntuarioRepository } from "../repositories/NumeroProntuarioRepository";
import { GetDateNow } from "../util/GetDateNow";

interface INumeroprontuario{
    codProntuarioUuId: string,
}

class NumeroProntuarioServices {

    async createNumeroProntuario({ codProntuarioUuId }: INumeroprontuario) {

        const numeroprontuarioRepository = getCustomRepository( NumeroProntuarioRepository);

        const numeroprontuario = numeroprontuarioRepository.create({
            codProntuarioUuId
        });

        await numeroprontuarioRepository.save(numeroprontuario);

        return numeroprontuario;
    }

    

}

export { NumeroProntuarioServices };
