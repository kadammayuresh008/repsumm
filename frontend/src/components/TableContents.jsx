import React from "react";
import "./styles.css";
import { Accordion } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const TableRow = (props) => {

  let history = useHistory();

  const redirect = () => {
    history.push('/UploadDoc');
  }


  return (
    <tr>
      <td id="paper-index" onClick={redirect}>
        {/* <span>
          <i class='fas fa-sticky-note'></i>
          PAPER {props.index}
        </span> */}
         {/* <Accordion.Header>Title</Accordion.Header>
            <Accordion.Body>
              1.A Plasmonic Refractive-Index Sensor Based Multiple Fano
              Resonance Multiplexing in Slot-Cavity Resonant System
            </Accordion.Body> */}
            A Plasmonic Refractive-Index Sensor Based Multiple Fano
              Resonance Multiplexing in Slot-Cavity Resonant System
      </td>
      {/* <td>
          
            <Accordion.Header>Title</Accordion.Header>
            <Accordion.Body>
              1.A Plasmonic Refractive-Index Sensor Based Multiple Fano
              Resonance Multiplexing in Slot-Cavity Resonant System
            </Accordion.Body>
      </td> */}
      <td>
      <Accordion>
      <Accordion.Item eventKey="0">
            <Accordion.Header>Abstract</Accordion.Header>
            <Accordion.Body>
              In this paper, a sub-wavelength metal-insulator-metal (MIM) waveguide structure is
              proposed by using a cross-shape rectangular cavity, of which wings are coupled with two rectangular
              cavities. Firstly, a cross-shape rectangular cavity is placed between the input and output MIM
              waveguides. According to the mutual interference between bright and dark modes, three Fano
              resonant peaks are generated. Secondly, by adding a rectangular cavity on the left wing of the cross
              shaped one, five asymmetric Fano resonance peaks are obtained. Thirdly, six asymmetric Fano
              resonance peaks are achieved after adding another cavity on the right wing. Finally, the
              finite-difference-time-domain (FDTD) method and multimode interference coupled-mode theory
              (MICMT) are used to simulate and analyze the coupled plasmonic resonant system, respectively. The
              highest sensitivity of 1 000nm/RIU is achieved.
            </Accordion.Body>
            </Accordion.Item>
    </Accordion>
      </td>
      <td>
      <Accordion>
      <Accordion.Item eventKey="0">
            <Accordion.Header>Introduction</Accordion.Header>
            <Accordion.Body>
              Firstly, Fano resonance was proved to be caused
              by coherent interference between discrete state and
              continuous state in the atomic system [1–3].
              Secondly, Fano resonance has the characteristics of
              high refractive index sensitivity, high preferred
              value, and strong field enhancement, showing
              ultra-clear and asymmetric lines. Therefore, the
              unique characteristics make Fano resonance
              applicable to various optical fields, such as filters,
              splitters, and sensors [4–10]. In particular, Fano
              resonances recently have been observed in the
              subwavelength metal-insulator-metal (MIM)

              waveguide structures. Because the plasmonic MIM
              waveguide is one of the most promising ways to
              obtain high integrated photonic circuit, Fano
              resonances in MIM waveguide structures have
              attracted many researchers’ attention [11–17]. In
              recent years, many different MIM waveguide
              structures have been designed and asymmetric Fano
              peak can be obtained in the visible to near infrared
              wavelength range [18–26]. For considering the
              development of integrated photonics and the parallel
              processing capacity with multiple Fano channels,
              people begin to explore the possibility of generating
              more Fano resonance peaks by designing compact
              MIM structures [27, 28].In this paper, three Fano resonances are firstly
              realized in a cross-shape MIM waveguide structure
              owing to the mutual interference between the bright
              and dark resonant modes. Then, two rectangular
              cavities are successively added at both ends of the
              cross-shape one to obtain more effects of mode
              interactions. Consequently, up to six asymmetrical
              Fano resonant peaks are generated in this proposed
              structure. The performance of the MIM structure is
              analyzed by the finite-difference-time-domain
              (FDTD) method and multimode interference
              coupled-mode theory (MICMT), respectively.
            </Accordion.Body>
            </Accordion.Item>
    </Accordion>
      </td>
      <td>
      <Accordion>
      <Accordion.Item eventKey="0">
            <Accordion.Header>Methodology</Accordion.Header>
            <Accordion.Body>
            In Fig. 1(a), the horizontal and vertical parts of
                the cross-shape cavity resonator are considered as a
                classical end-coupled Fabry-Pero (FP) resonator,
                respectively. They can respectively provide the
                bright and dark resonant modes, of which the
                interaction can induce Fano resonance. The widths
                of the MIM waveguide and the rectangular resonator
                are represented by D. The distances between the
                cross-shape cavity and the input/output waveguide
                are denoted by g, and the lengths of vertical
                rectangular cavity and horizontal one are defined by
                L and S, respectively. During the FDTD simulations,
                the following parameters remain the same all
                through the paper: the width is D=50nm, the length
                is L=640 nm, the lengths of the upper and below
                parts of the vertical cavity are l1=410 nm and l2=
                180nm, respectively, and the lengths of both wings
                of the horizontal cavity are the same as S=190nm.
                Gap (g) of 10 nm requires challenging thickness
                control of metal, but some teams have solved this
                problem. Wei [29] used the oxygen plasma etching
                technology to reduce the spacing of metal triangular
                nanoparticles in the MIM structure to 10 nm scale.
                Miyazaki et al. [30] considered a dielectric with a
                thickness of T between two noble metal plates in a
                MIM waveguide. For T values less than 10 nm,
                small wavelength plasmons with wavelength of
                10nm can be obtained from visible light to the near

                infrared. In this paper, deposition of nanometer-thick
                thin film is sufficiently feasible with conventional
                techniques. Therefore, the distance g is defined as
                10nm. A uniform set of perfectly matched layers is
                used in the structure as absorbing boundary
                conditions. Firstly, we define the metal and
                dielectric materials as silver and air, respectively,
                and obtain the dielectric constant from the
                experimental data [31]. Specifically, there are two
                kinds of modes with wide band or narrow band. Due
                to mutual interference of light and dark modes, the
                Fano resonance of asymmetric line is produced. The
                simulated spectrum plotted with black solid lines is
                shown in Fig. 1(b), which explains that three
                transmission peaks with transmittances of ~0.4,
                ~0.6, and ~0.2 are generated at 510 nm, 610 nm,
                and 890 nm, respectively. Three steep dips, which
                have the lowest transmittances of ~ 0 at 520 nm,
                620 nm, and 900 nm, occur at the right sides
                of the transmission peaks, respectively. Moreover,
                there is a Lorentz peak at 1 280 nm owing
                to FP resonance. All the simulations assume
                smooth metal surface. Although the sidewall
                roughness of the fabricated metal slot is quite
                large, this problem can be solved. Alimardani et al.
                [32] fabricated MIM tunneling diodes on various
                high and low power functional metals with different
                root mean square roughnesses by using the
                high-quality atom layer of Al2O3 deposited as the
                insulating layer. It is found that the surface
                roughness of the electrode can control the current
                and voltage characteristics of the MIM diode and
                overcome the influence of the metal working
                function. After extensive research by the authors,
                they believed that the roughness of the bottom
                electrode to be less than 20% of the thickness of the
                insulator in order to achieve nonroughness
                dominated electrical behavior.
            </Accordion.Body>
            </Accordion.Item>
    </Accordion>
      </td>
      <td>
      <Accordion>
      <Accordion.Item eventKey="0">
            <Accordion.Header>Result</Accordion.Header>
            <Accordion.Body>
            The sensing performance of the proposed
                structure is demonstrated with responding to
                different refractive indices of the dielectric marked
                white in Fig.1(a). The geometrical parameters of the
                structure are those given in the previous section. The
                refractive index has been varied from 1 to 1.15 with
                a step of 0.05 and the corresponding responses are
                shown in Fig.2(a). It can be seen that the Fano-like
                response is preserved at all four resonances for each

                response. The sensitivity of a sensor (nm/RIU) is
                usually defined as the shift in the resonance
                wavelength per unit variation of the refractive index
                [33]. According to the responses, the calculated
                values are 400 nm/RIU, 700 nm/RIU, and
                1 000nm/ RIU for the Fano peaks at 510nm, 610nm,
                and 890 nm, respectively. The sensitivity of
                1 000 nm/RIU is higher than those of most similar
                MIM systems, meaning our system will be more

                178 Photonic Sensors

                sensitive to small variations of the surrounding. In a
                more detailed sensing application, once the
                refractive index of the medium changes with
                temperature, concentration or pressure, the
                displacement of the resonant peak can be measured
                to calculate the refractive index change. Therefore,
                the structure can be used for sensing applications in
                different refractive index environments, such as
                biological and medical applications, where the
                sensing material is a water-based solution. Moreover,
                in the aspect of refractive index sensing, the
                advantage of multiple Fano resonance is that it can
                be used not only in the refractive index sensitive
                region, but also in the fast/slow light region. The
                proposed structure can also be used to realize the
                integration and miniaturization of the photonic loop,
                which provides some theoretical reference for
                simultaneous detection and differential sensing of
                various samples to be tested.
            </Accordion.Body>
            </Accordion.Item>
    </Accordion>
      </td>
      <td>
      <Accordion>
      <Accordion.Item eventKey="0">
            <Accordion.Header>Conclusion</Accordion.Header>
            <Accordion.Body>
            Transmission characteristics of SPPs-based
                MIM waveguides in the cross-shape rectangular
                cavity and two end-coupled rectangular cavity
                resonators have been proposed and investigated. The
                results show that all the cavities can effectively
                provide the bright or dark modes that interact with
                each other and up to six Fano resonant peaks have
                been achieved. In addition, the negative and positive
                group delays are also observed in Fano windows,
                and the proposed structure can not only be used in
                the refractive index sensing area, and also be used in
                the fast/slow light region. The performances of the
                proposed structure have been investigated by FDTD
                simulation and analyzed by MICMT. It can be
                considered that the proposed structure has broad
                application prospects in the field of on-chip optical
                sensing.
                </Accordion.Body>  
                </Accordion.Item>
    </Accordion> 
      </td>
    </tr>
  );
}

const TableContent = () => {
  return (
    <tbody>
      <TableRow index="1"></TableRow>
      {/* <TableRow index="1"></TableRow>
      <TableRow index="1"></TableRow>
      <TableRow index="1"></TableRow> */}
    </tbody>
  );
};

export default TableContent;
